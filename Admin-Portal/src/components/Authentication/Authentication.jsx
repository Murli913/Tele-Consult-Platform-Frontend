import React, { useEffect, useRef, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Peer from "simple-peer";
import io from "socket.io-client";
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
import { ContactUs } from "../email/email";
import Message from "../Message/Message";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { MdCallEnd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
const socket = io.connect('http://localhost:5000');

const Authentication = () => {
    const [me, setMe] = useState("");
    const [stream, setStream] = useState();
    const [receivingCall, setReceivingCall] = useState(false);
    const [caller, setCaller] = useState("");
    const [callerSignal, setCallerSignal] = useState();
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [name, setName] = useState("");
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOn, setIsVideoOn] = useState(true);
    const [isScreenSharing, setIsScreenSharing] = useState(false);
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState("");
    const [recording, setRecording] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileSuccess, setFileSuccess] = useState("");
    const [fileError, setFileError] = useState("");
    const [receivedFiles, setReceivedFiles] = useState([]);
    const [idToCall, setIdToCall] = useState(""); // Added idToCall state
const navigate=useNavigate();
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

        socket.on("fileSuccess", (message) => {
            setFileSuccess(message);
        });

        socket.on("fileError", (message) => {
            setFileError(message);
        });

        socket.on("fileLink", (file) => {
            setReceivedFiles(prevFiles => [...prevFiles, file]);
        });

        return () => {
            socket.off("me");
            socket.off("callUser");
            socket.off("callAccepted");
            socket.off("callEnded");
            socket.off("message");
            socket.off("startRecording");
            socket.off("stopRecording");
            socket.off("fileSuccess");
            socket.off("fileError");
            socket.off("fileLink");
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

    // const leaveCall = () => {
    //     setCallEnded(true);
    //     if (stream) {
    //         stream.getTracks().forEach(track => {
    //             track.stop();
    //         });
    //     }
    //     if (connectionRef.current) {
    //         connectionRef.current.destroy();
    //     }
    //     socket.emit("callEnded", { to: caller, from: me });
    // };
    const leaveCall = () => {
        setCallEnded(true);
        if (stream) {
            stream.getTracks().forEach(track => {
                track.stop();
            });
            setStream(null); // Turn off local stream
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
                from: "Admin",
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

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const gotoadddoctor = () => {
        navigate("/adddoctor");
    };

    const sendFile = () => {
        if (selectedFile) {
            const reader = new FileReader();
            reader.readAsArrayBuffer(selectedFile);
            reader.onload = () => {
                socket.emit("sendFile", reader.result);
                setFileSuccess("send sucess");
                setFileError("");
            };
        } else {
            setFileError("Please select a file.");
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ margin: '20px', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                 <Card style={{ position: 'absolute',
                        top: 'calc(30px + 1em)',
                        left: '28%',
                        transform: 'translateX(-50%)',
                        zIndex: 1,
                         width: '500px', 
                         height: '750px', 
                          margin: '10px' }}>
                    <CardContent>
                <h1 style={{ position: 'absolute',
                        top: 'calc(-20px + 1em)',
                        left: '70%',
                        transform: 'translateX(-50%)',
                        zIndex: 1,
                         width: '500px', 
                         height: '750px', 
                          margin: '10px' }}>Authentication Call</h1>

                <TextField
                    id="filled-basic"
                    label="Name"
                    variant="filled"
                    className="textfiled"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                        position: 'absolute',
                        top: 'calc(60px + 1em)',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 1,
                        width: '300px'
                    }}
                />

                <CopyToClipboard text={me} style={{
                    position: 'absolute',
                    top: 'calc(140px + 1em)',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 1,
                    width: '300px'
                }}>
                    <Button variant="contained" color="primary" startIcon={<AssignmentIcon fontSize="large" />}>
                        Admin Caller ID
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
                        top: 'calc(200px + 1em)',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 1,
                        width: '300px'
                    }}
                />

                <input type="file" onChange={handleFileChange} style={{
                    position: 'absolute',
                    top: 'calc(310px + 1em)',
                    left: '40%',
                    transform: 'translateX(-50%)',
                    zIndex: 1,
                    width: '200px',
                    height: '200px'
                }} />

                <Button variant="contained" color="primary" onClick={sendFile} style={{
                    position: 'absolute',
                    top: 'calc(300px + 1em)',
                    left: '70%',
                    transform: 'translateX(-50%)',
                    zIndex: 1,
                }}>
                    Send File
                </Button>


                {fileSuccess && (
                    <p style={{ color: 'green', position: 'absolute', top: 'calc(350px + 1em)', left: '70%', transform: 'translateX(-50%)' }}>{fileSuccess}</p>
                )}
                {fileError && (
                    <p style={{ color: 'red', position: 'absolute', top: 'calc(350px + 1em)', left: '70%', transform: 'translateX(-50%)' }}>{fileError}</p>
                )}




{callAccepted && !callEnded ? (
                    <IconButton color="primary" aria-label="call"  onClick={leaveCall} style={{
                        position: 'absolute',
                        top: 'calc(360px + 1em)',
                        left: '22%',
                        transform: 'translateX(-50%)',
                        zIndex: 1,
                    }}>
                          <MdCallEnd fontSize="large" style={{ fontSize: '40px' , color: 'red' }} />
                    </IconButton>
                ) : <IconButton color="primary" aria-label="call" onClick={() => callUser(idToCall)} style={{
                    position: 'absolute',
                    top: 'calc(360px + 1em)',
                    left: '22%',
                    transform: 'translateX(-50%)',
                    zIndex: 1,
                }}>
                    <PhoneIcon fontSize="large" />
                </IconButton>}

                <div>

                    <IconButton color="primary" aria-label="toggle-audio" onClick={toggleAudio} style={{
                        position: 'absolute',
                        top: 'calc(360px + 1em)',
                        left: '35%',
                        transform: 'translateX(-50%)',
                        zIndex: 1,
                    }}>
                        {isMuted ? <MicOffIcon fontSize="large" /> : <MicIcon fontSize="large" />}
                    </IconButton>
                    <IconButton color="primary" aria-label="toggle-video" onClick={toggleVideo} style={{
                        position: 'absolute',
                        top: 'calc(360px + 1em)',
                        left: '48%',
                        transform: 'translateX(-50%)',
                        zIndex: 1,
                    }}>
                        {isVideoOn ? <VideocamIcon fontSize="large" /> : <VideocamOffIcon fontSize="large" />}
                    </IconButton>

                    <IconButton color="primary" aria-label="toggle-screen-share" onClick={toggleScreenSharing} style={{
                        position: 'absolute',
                        top: 'calc(360px + 1em)',
                        left: '63%',
                        transform: 'translateX(-50%)',
                        zIndex: 1,
                    }}>
                        {isScreenSharing ? <StopScreenShareIcon fontSize="large" /> : <ScreenShareIcon fontSize="large" />}
                    </IconButton>

                    <IconButton color="primary" aria-label="start-recording" onClick={recording ? stopRecording : startRecording} style={{
                    position: 'absolute',
                    top: 'calc(360px + 1em)',
                    left: '77%',
                    transform: 'translateX(-50%)',
                    zIndex: 1,
                }}>
                    {recording ? <StopIcon fontSize="large" /> : <FiberManualRecordIcon fontSize="large" />}
                </IconButton>
                </div> 

                <div>
                      
                {receivingCall && !callAccepted ? (
                    <div className="caller">
                        <h1 style={{
                            position: 'absolute',
                            top: 'calc(470px + 1em)',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            zIndex: 1,
                            fontWeight: 'bold',
                            color: 'black',
                        }}>{name} is calling...</h1>
                        <Button variant="contained" color="primary" onClick={answerCall} style={{
                            position: 'absolute',
                            top: 'calc(550px + 1em)',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            zIndex: 1,
                        }}>
                            Answer
                        </Button>
                    </div>
                ) : null}
                </div>

             
                <div style={{
                    position: 'absolute',
                    top: 'calc(450px + 1em)',
                    left: '35%',
                    transform: 'translateX(-50%)',
                    zIndex: 1,
                    padding:'10px'
                }}>
                                <h3  
                >Received Files:</h3>
                 {receivedFiles.length > 0 && (
    <div>
        <h3 style={{
            position: 'absolute',
            top: 'calc(550px + 1em)',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1,
            color: 'black',
            padding: '10px'
        }}>Received Files:</h3>
        <ul>
            {receivedFiles.map((file, index) => (
                <li key={index}>
                    <a href={`http://localhost:5000/uploads/${file.filename}`} target="_blank" download>
                        {index + 1} {" . "} {file.filename}
                    </a>
                </li>
            ))}
        </ul>
    </div>
)}
                </div>

                <div style={{
                    position: 'absolute',
                    top: 'calc(640px + 1em)',
                    left: '40%',
                    transform: 'translateX(-50%)',
                    zIndex: 1,
                    padding:'10px'
                }}>
                    <Button on onClick={gotoadddoctor} style={{
            backgroundColor: "#4CAF50", 
            border: "none", 
            color: "white", 
            padding: "15px 32px", 
            textAlign: "center", 
            textDecoration: "none", 
            display: "inline-block", 
            fontSize: "16px", 
            margin: "4px 2px", 
            cursor: "pointer", 
            borderRadius: "12px" }}>Add New Doctor</Button>
                </div>

             
             </CardContent>
             </Card>
             </div>



{/* second component*/ }
             <div style={{ margin: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Card style={{ 
                    position: 'absolute',
                    top: 'calc(30px + 1em)',
                    left: '55%',
                    transform: 'translateX(-50%)',
                    zIndex: 1,
                     width: '500px', 
                     height: '750px', 
                      margin: '10px'  }}>
                    <CardContent>
                <video playsInline muted ref={myVideo} autoPlay style={{
                    position: 'absolute',
                    top: 'calc(5px + 1em)',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 1,
                    width: "450px",
                    height: "250px"
                }} />
                   {callAccepted && !callEnded ? 
                <video playsInline ref={userVideo} autoPlay style={{
                    position: 'absolute',
                    top: 'calc(280px + 1em)',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 1,
                    width: "400px",
                    height: "250px"
                }} /> : null}
             



{/*chat box */}
                <div className="chat-box" id="chat-box" style={{
                    position: 'absolute',
                    bottom: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 1,
                    width: '90%',
                    height: '180px',
                    overflowY: 'scroll',
                    border: '1px solid black', // Set border color to black
                    borderRadius: '15px',
                    padding: '20px'
                }}>

                    {messages.map((message, index) => (
                        <div key={index} style={{ fontWeight: 'bold', color: 'black', marginBottom: '5px' }}>
                            <strong>{"Admin"}: </strong> {message.text}
                        </div>
                    ))}

                </div>
                <div style={{
                    position: 'absolute',
                    bottom: '30px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                    marginTop: '10px',

                }}>
                    <TextField
                        id="message"
                        label="Type a message"
                        variant="outlined"
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        style={{ width: '70%', fontWeight: 'bold', color: 'black' }}
                    />
                    <IconButton onClick={sendMessage} style={{ marginLeft: '10px' }}>
                        <SendIcon />
                    </IconButton>
                </div>

</CardContent>
</Card>
</div>
       
{/*third compoenent */}
               
<div style={{ margin: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
<Card style={{ 
                    position: 'absolute',
                    top: 'calc(30px + 1em)',
                    left: '82%',
                    transform: 'translateX(-50%)',
                    zIndex: 1,
                     width: '500px', 
                     height: '750px', 
                      margin: '10px'  }}>
<CardContent>

                <div style={{
                    position: 'absolute',
                    top: 'calc(120px + 1em)',
                    left: '45%',
                    transform: 'translateX(-50%)',
                    zIndex: 1,
                    width: '1000px',
                    }}>
                <ContactUs/>
                </div>
                <div style={{
                    position: 'absolute',
                    top: 'calc(5px + 1em)',
                    left: '45%',
                    transform: 'translateX(-50%)',
                    zIndex: 1,
                    width: '300px',
                    }}>  <Message/>

                </div>
                </CardContent>
</Card>
</div>
            </div>

        
       
    );
};

export default Authentication;
