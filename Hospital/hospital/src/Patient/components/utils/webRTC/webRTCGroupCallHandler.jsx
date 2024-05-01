import * as wss from '../wssConnection/wssConnection';
import store from '../../store/store';
import { setGroupCallActive, setCallState, callStates, setGroupCallIncomingStreams, clearGroupCallData } from '../../store/actions/callActions';

let myPeer;
let myPeerId;
let groupCallRoomId;
let groupCallHost = false;

export const connectWithMyPeer = () => {
  myPeer = new window.Peer(undefined, {
    path: '/peerjs',
    host: '/',
    port: '5000'
  });

  myPeer.on('open', (id) => {
    console.log('succesfully connected with peer server');
    myPeerId = id;
  });

  myPeer.on('call', call => {
    call.answer(store.getState().call.localStream);
    call.on('stream', incomingStream => {
      const streams = store.getState().call.groupCallStreams;
      const stream = streams.find(stream => stream.id === incomingStream.id);

      if (!stream) {
        addVideoStream(incomingStream);
      }
    });
  });
};

export const createNewGroupCall = (roomId) => {
  groupCallHost = true;
  console.log('\nCreating new group call with room id: ', roomId);
  wss.registerGroupCall({
    username: store.getState().dashboard.username,
    peerId: myPeerId,
    roomId: roomId
  });
  console.log("Creating new group call with room id : ", groupCallRoomId);
  store.dispatch(setGroupCallActive(true));
  store.dispatch(setCallState(callStates.CALL_IN_PROGRESS));
};

export const joinGroupCall = (socketId, roomId) => {
  const localStream = store.getState().call.localStream;
  groupCallRoomId = roomId;
  console.log("\nJoining group call with room id:", roomId);
  console.log("\nLocal stream id: ", localStream.id);
  wss.userWantsToJoinGroupCall({
    peerId: myPeerId,
    roomId: roomId,
    localStreamId: localStream.id
  });
  store.dispatch(setGroupCallActive(true));
  store.dispatch(setCallState(callStates.CALL_IN_PROGRESS));
};

export const connectToNewUser = (data) => {
  const localStream = store.getState().call.localStream;

  const call = myPeer.call(data.peerId, localStream);

  call.on('stream', (incomingStream) => {
    const streams = store.getState().call.groupCallStreams;
    const stream = streams.find(stream => stream.id === incomingStream.id);

    if (!stream) {
      addVideoStream(incomingStream);
    }
  });
};

export const leaveGroupCall = () => {
  if (groupCallHost) {
    wss.groupCallClosedByHost({
      peerId: myPeerId
    });
  } else {
    wss.userLeftGroupCall({
      streamId: store.getState().call.localStream.id,
      roomId: groupCallRoomId,
      peerId: myPeerId
    });
  }
  clearGroupData();
};

export const clearGroupData = () => {
  groupCallRoomId = null;
  groupCallHost = null;
  store.dispatch(clearGroupCallData());
  myPeer.destroy();
  connectWithMyPeer();

  const localStream = store.getState().call.localStream;
  localStream.getVideoTracks()[0].enabled = true;
  localStream.getAudioTracks()[0].enabled = true;
};

export const removeInactiveStream = (data) => {
  const groupCallStreams = store.getState().call.groupCallStreams.filter(
    stream => stream.id !== data.streamId
  );
  store.dispatch(setGroupCallIncomingStreams(groupCallStreams));
};

const addVideoStream = (incomingStream) => {
  const groupCallStreams = [
    ...store.getState().call.groupCallStreams,
    incomingStream
  ];

  store.dispatch(setGroupCallIncomingStreams(groupCallStreams));
};

// if group call is active return roomId if not return false
export const checkActiveGroupCall = () => {
  if (store.getState().call.groupCallActive) {
    return groupCallRoomId;
  } else {
    return false;
  }
};
