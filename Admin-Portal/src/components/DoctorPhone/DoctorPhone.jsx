import React, { useEffect, useRef, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Peer from "simple-peer";
import io from "socket.io-client";
import './DoctorPhone.css';
import RecordRTC from 'recordrtc';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import StopIcon from '@material-ui/icons/Stop';
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import AssignmentIcon from "@material-ui/icons/Assignment";
import PhoneIcon from "@material-ui/icons/Phone";
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import ScreenShareIcon from '@material-ui/icons/ScreenShare';
import StopScreenShareIcon from '@material-ui/icons/StopScreenShare';
import SendIcon from '@material-ui/icons/Send';


const socket = io.connect('http://localhost:5000');

function DoctorPhone() {
    const [me, setMe] = useState("");
    const [stream, setStream] = useState();
    const [receivingCall, setReceivingCall] = useState(false);
    const [caller, setCaller] = useState("");
    const [callerSignal, setCallerSignal] = useState();
    const [callAccepted, setCallAccepted] = useState(false);
    const [idToCall, setIdToCall] = useState("");
    const [callEnded, setCallEnded] = useState(false);
    const [name, setName] = useState("");
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOn, setIsVideoOn] = useState(true);
    const [isScreenSharing, setIsScreenSharing] = useState(false);
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState("");
    const [recording, setRecording] = useState(false);
    const [currentTime, setCurrentTime] = useState(""); // State for current time

    const recorderRef = useRef(null);
    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
            setStream(stream);
            if (myVideo.current) {
                myVideo.current.srcObject = stream;
            }
        });

        socket.on("me", (id) => {
            setMe(id);
        });

        socket.on("callUser", (data) => {
            setReceivingCall(true);
            setCaller(data.from);
            setName(data.name);
            setCallerSignal(data.signal);
        });

        socket.on("callAccepted", (signal) => {
            setCallAccepted(true);
            connectionRef.current.signal(signal);
        });

        socket.on("callEnded", () => {
            setCallEnded(true);
            if (stream) {
                stream.getTracks().forEach(track => {
                    track.stop();
                });
            }
            if (connectionRef.current) {
                connectionRef.current.destroy();
            }
        });

        socket.on("message", (message) => {
            setMessages(prevMessages => [...prevMessages, message]);
        });

        socket.on("startRecording", () => {
            startRecording();
        });

        socket.on("stopRecording", () => {
            stopRecording();
        });

        // Update current time every second
        const intervalId = setInterval(() => {
            const date = new Date();
            setCurrentTime(date.toLocaleTimeString());
        }, 1000);

        return () => {
            socket.off("me");
            socket.off("callUser");
            socket.off("callAccepted");
            socket.off("callEnded");
            socket.off("message");
            socket.off("startRecording");
            socket.off("stopRecording");
            clearInterval(intervalId); // Clear interval when component unmounts
        };
    }, []);

    const callUser = (id) => {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream
        });

        peer.on("signal", (data) => {
            socket.emit("callUser", {
                userToCall: id,
                signalData: data,
                from: me,
                name: name
            });
        });

        peer.on("stream", (stream) => {
            if (userVideo.current) {
                userVideo.current.srcObject = stream;
            }
        });

        connectionRef.current = peer;
    };

    const answerCall = () => {
        setCallAccepted(true);
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream
        });

        peer.on("signal", (data) => {
            socket.emit("answerCall", { signal: data, to: caller });
        });

        peer.on("stream", (stream) => {
            if (userVideo.current) {
                userVideo.current.srcObject = stream;
            }
        });

        peer.signal(callerSignal);
        connectionRef.current = peer;
    };

    const leaveCall = () => {
        setCallEnded(true);
        if (stream) {
            stream.getTracks().forEach(track => {
                track.stop();
            });
        }
        if (connectionRef.current) {
            connectionRef.current.destroy();
        }
        socket.emit("callEnded", { to: caller, from: me });
    };

    const toggleAudio = () => {
        setIsMuted(prevState => !prevState);
        if (stream) {
            stream.getAudioTracks()[0].enabled = !isMuted;
        }
    };

    const toggleVideo = () => {
        setIsVideoOn(prevState => !prevState);
        if (stream) {
            stream.getVideoTracks()[0].enabled = !isVideoOn;
        }
    };

    const toggleScreenSharing = () => {
        if (!isScreenSharing) {
            navigator.mediaDevices.getDisplayMedia({ video: true })
                .then(screenStream => {
                    const screenTrack = screenStream.getTracks()[0];
                    connectionRef.current.replaceTrack(stream.getVideoTracks()[0], screenTrack, stream);
                    setIsScreenSharing(true);
                    screenTrack.onended = () => {
                        connectionRef.current.replaceTrack(screenTrack, stream.getVideoTracks()[0], stream);
                        setIsScreenSharing(false);
                    };
                })
                .catch(err => console.error("Error sharing screen: ", err));
        } else {
            const screenTrack = stream.getVideoTracks().find(track => track.kind === 'video');
            connectionRef.current.replaceTrack(stream.getVideoTracks()[0], screenTrack, stream);
            setIsScreenSharing(false);
        }
    };

    const sendMessage = () => {
        if (messageInput.trim() !== "") {
            const message = {
                from: me,
                text: messageInput.trim()
            };
            socket.emit("message", message);
            setMessageInput("");
        }
    };

    const startRecording = () => {
        if (!recorderRef.current) {
            const options = {
                type: 'video',
                mimeType: 'video/webm',
                bitsPerSecond: 128000
            };

            recorderRef.current = new RecordRTC(stream, options);
            recorderRef.current.startRecording();
            setRecording(true);
        }
    };

    const stopRecording = () => {
        if (recorderRef.current) {
            recorderRef.current.stopRecording(() => {
                const blob = recorderRef.current.getBlob();
                downloadRecording(blob);
                setRecording(false);
                recorderRef.current = null;
            });
        }
    };

    const downloadRecording = (blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'recording.webm';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    };

    return (
        <div className="App">
            App
           <header className="App-header">
                <img src="https://blog.logrocket.com/wp-content/uploads/2023/12/img1-Basic-React-Native-app-set-up-Expo.png" alt="logo" />
                <h1 className='top-text'>Video Call</h1>
                <h5  style={{
                        position: 'absolute',
                        top: 'calc(-30px + 1em)',
                        left: '44%',
                        transform: 'translateX(-50%)',
                        zIndex: 1, fontWeight: 'bold',
                        color: 'black'
                      
                    }}>{currentTime}</h5> 
                <TextField
                    id="filled-basic"
                    label="Name"
                    variant="filled"
                    className="textfiled"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                        position: 'absolute',
                        top: 'calc(120px + 1em)',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 1,
                    }}
                />
                <CopyToClipboard text={me} style={{
                    position: 'absolute',
                    top: 'calc(220px + 1em)',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 1,
                }}>
                    <Button variant="contained" color="primary" startIcon={<AssignmentIcon fontSize="large" />}>
                        Copy ID
                    </Button>
                </CopyToClipboard>

                <TextField
                    id="filled-basic"
                    label="ID to call"
                    variant="filled"
                    value={idToCall}
                    onChange={(e) => setIdToCall(e.target.value)}
                    style={{
                        position: 'absolute',
                        top: 'calc(260px + 1em)',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 1,
                    }}
                />

                {stream && <video playsInline muted ref={myVideo} autoPlay style={{
                    position: 'absolute',
                    top: 'calc(340px + 1em)',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 1,
                    width: "300px"
                }} />}

                {callAccepted && !callEnded && userVideo.current ? (
                    <video playsInline ref={userVideo} autoPlay style={{
                        position: 'absolute',
                        top: 'calc(600px + 1em)',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 1,
                        width: "300px"
                    }} />
                ) : null}

                {callAccepted && !callEnded ? (
                    <Button variant="contained" color="secondary" onClick={leaveCall} style={{
                        position: 'absolute',
                        top: 'calc(600px + 1em)',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 1,
                    }}>
                        End Call
                    </Button>
                ) : (
                    <div>
                        <IconButton color="primary" aria-label="call" onClick={() => callUser(idToCall)} style={{
                            position: 'absolute',
                            top: 'calc(600px + 1em)',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            zIndex: 1,
                        }}>
                            <PhoneIcon fontSize="large" />
                        </IconButton>
                        <IconButton color="primary" aria-label="toggle-audio" onClick={toggleAudio} style={{
                            position: 'absolute',
                            top: 'calc(780px + 1em)',
                            left: '43%',
                            transform: 'translateX(-50%)',
                            zIndex: 1,
                        }}>
                            {isMuted ? <MicOffIcon fontSize="large" /> : <MicIcon fontSize="large" />}
                        </IconButton>
                        <IconButton color="primary" aria-label="toggle-video" onClick={toggleVideo} style={{
                            position: 'absolute',
                            top: 'calc(780px + 1em)',
                            left: '47%',
                            transform: 'translateX(-50%)',
                            zIndex: 1,
                        }}>
                            {isVideoOn ? <VideocamIcon fontSize="large" /> : <VideocamOffIcon fontSize="large" />}
                        </IconButton>
                        <IconButton color="primary" aria-label="toggle-screen-share" onClick={toggleScreenSharing} style={{
                            position: 'absolute',
                            top: 'calc(780px + 1em)',
                            left: '57%',
                            transform: 'translateX(-50%)',
                            zIndex: 1,
                        }}>
                            {isScreenSharing ? <StopScreenShareIcon fontSize="large" /> : <ScreenShareIcon fontSize="large" />}
                        </IconButton>
                    </div>
                )}

                {receivingCall && !callAccepted ? (
                    <div className="caller">
                        <h1 style={{
                            position: 'absolute',
                            top: 'calc(600px + 1em)',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            zIndex: 1,
                            fontWeight: 'bold',
                            color: 'black',
                        }}>{name} is calling...</h1>
                        <Button variant="contained" color="primary" onClick={answerCall} style={{
                            position: 'absolute',
                            top: 'calc(800px + 1em)',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            zIndex: 1,
                        }}>
                            Answer
                        </Button>
                    </div>
                ) : null}

                <div className="chat-box" id="chat-box" style={{
                    position: 'absolute',
                    bottom: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 1,
                    width: '19%',
                    height: '100px',
                    overflowY: 'scroll',
                    border: '1px solid #00000',
                    borderRadius: '5px',
                    padding: '10px'
                }}>

                    {messages.map((message, index) => (
                        <div key={index} style={{ fontWeight: 'bold', color: 'black', marginBottom: '5px' }}>
                            <strong>{message.from}: </strong> {message.text}
                        </div>
                    ))}

                </div>
                <div style={{
                    position: 'absolute',
                    bottom: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    width: '80%',
                    marginTop: '10px',

                }}>
                    <TextField
                        id="message"
                        label="Type a message"
                        variant="outlined"
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        style={{ width: '20%', fontWeight: 'bold', color: 'black' }}
                    />
                    <IconButton onClick={sendMessage} style={{ marginLeft: '10px' }}>
                        <SendIcon />
                    </IconButton>
                </div>

                <IconButton color="primary" aria-label="start-recording" onClick={recording ? stopRecording : startRecording} style={{
                    position: 'absolute',
                    top: 'calc(780px + 1em)',
                    left: '52%',
                    transform: 'translateX(-50%)',
                    zIndex: 1,
                }}>
                    {recording ? <StopIcon fontSize="large" /> : <FiberManualRecordIcon fontSize="large" />}
                </IconButton>

            </header>
        </div>
    );
}

export default DoctorPhone;
