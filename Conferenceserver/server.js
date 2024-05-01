const express = require('express');
const socket = require('socket.io');
const { ExpressPeerServer } = require('peer');
const groupCallHandler = require('./groupCallHandler');
const { v4: uuidv4 } = require('uuid');


const PORT = 5000;

const app = express();

const server = app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});

const peerServer = ExpressPeerServer(server, {
  debug: true
});

app.use('/peerjs', peerServer);

groupCallHandler.createPeerServerListeners(peerServer);

const io = socket(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

let peers = [];
let groupCallRooms = [];
let roomToIDs = new Map();

const MAX_PARTICIPANTS = 25; // Maximum participants allowed in a group call

const broadcastEventTypes = {
  ACTIVE_USERS: 'ACTIVE_USERS',
  GROUP_CALL_ROOMS: 'GROUP_CALL_ROOMS'
};

io.on('connection', (socket) => {
  socket.emit('connection', null);
  console.log('new user connected');
  console.log(socket.id);

  socket.on('register-new-user', (data) => {
    peers.push({
      username: data.username,
      socketId: data.socketId
    });
    console.log('registered new user');
    console.log(peers);

    io.sockets.emit('broadcast', {
      event: broadcastEventTypes.ACTIVE_USERS,
      activeUsers: peers
    });

    io.sockets.emit('broadcast', {
      event: broadcastEventTypes.GROUP_CALL_ROOMS,
      groupCallRooms
    });
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
    peers = peers.filter(peer => peer.socketId !== socket.id);
    io.sockets.emit('broadcast', {
      event: broadcastEventTypes.ACTIVE_USERS,
      activeUsers: peers
    });

    roomToIDs.forEach((keyList, key) => {
      const index = keyList.indexOf(socket.id);
      if (index !== -1) {
          keyList.splice(index, 1);
      }
    });

    // Also remove the disconnected user from the 'groupCallRooms' array
    groupCallRooms = groupCallRooms.filter(room => room.socketId !== socket.id);

    // Emit updated group call rooms and roomToIDs to all clients
    io.sockets.emit('broadcast', {
      event: broadcastEventTypes.GROUP_CALL_ROOMS,
      groupCallRooms,
      roomToIDs
    });
  });

  // listeners related with direct call

  socket.on('pre-offer', (data) => {
    console.log('pre-offer handled');
    io.to(data.callee.socketId).emit('pre-offer', {
      callerUsername: data.caller.username,
      callerSocketId: socket.id
    });
  });

  socket.on('pre-offer-answer', (data) => {
    console.log('handling pre offer answer');
    io.to(data.callerSocketId).emit('pre-offer-answer', {
      answer: data.answer
    });
  });

  socket.on('webRTC-offer', (data) => {
    console.log('handling webRTC offer');
    io.to(data.calleeSocketId).emit('webRTC-offer', {
      offer: data.offer
    });
  });

  socket.on('webRTC-answer', (data) => {
    console.log('handling webRTC answer');
    io.to(data.callerSocketId).emit('webRTC-answer', {
      answer: data.answer
    });
  });

  socket.on('webRTC-candidate', (data) => {
    console.log('handling ice candidate');
    io.to(data.connectedUserSocketId).emit('webRTC-candidate', {
      candidate: data.candidate
    });
  });

  socket.on('user-hanged-up', (data) => {
    io.to(data.connectedUserSocketId).emit('user-hanged-up');
  });

  // listeners related with group call
  socket.on('check-room-id', (roomId) => {

    if(roomToIDs.has(roomId)) {
      console.log('RoomId exist : '+roomId);
      console.log('Users in roomId '+roomId+' are :'+roomToIDs.get(roomId));
      socket.emit('room-id-result', {
        roomId: roomId,
        result: 'room-id-exist'
      });
    }
    else {
      console.log('RoomId does not exist : '+roomId);
      socket.emit('room-id-result', {
        roomId: roomId,
        result: 'room-id-invalid'
      });
    }
  });


  socket.on('group-call-register', (data) => {
    console.log('\nNew Group call register with roomID : '+data.roomId);
      socket.join(data.roomId);
      const newGroupCallRoom = {
        peerId: data.peerId,
        hostName: data.username,
        socketId: socket.id,
        roomId: data.roomId
      };
      roomToIDs.set(data.roomId,[socket.id]);
      console.log('RoomId is : '+data.roomId);
      console.log('Users in roomId '+data.roomId+' are :'+roomToIDs.get(data.roomId));
      groupCallRooms.push(newGroupCallRoom);
      io.sockets.emit('broadcast', {
        event: broadcastEventTypes.GROUP_CALL_ROOMS,
        groupCallRooms,
        roomToIDs
      });
  });

  socket.on('group-call-join-request', (data) => {
    console.log('\nGroup call join request to RoomID : '+data.roomId+'\nPeerID : '+data.peerId);
    let userIds = roomToIDs.get(data.roomId);
    console.log('Users in roomId are :'+userIds);
    if(userIds !== undefined) {
      console.log("\nCurrent Members in this roomID : "+userIds.length);
      if(userIds.length < 3) {
        console.log("\nStreamID is "+data.streamId+"\n");
        io.to(data.roomId).emit('group-call-join-request', {
          peerId: data.peerId,
          streamId: data.streamId
        });
        roomToIDs.get(data.roomId).push(socket.id);
        console.log('\nUser '+data.peerId+' joined room '+data.roomId);
        console.log('\nUsers in current room : '+roomToIDs.get(data.roomId));
        socket.join(data.roomId);
      } else {
        console.log("\nGroup call limit reached");
        console.log("\nUsers in roomId : "+roomToIDs.get(data.roomId));
        io.emit('group-call-limit-reached', {roomId: data.roomId});
      }
    }
  });

  socket.on('group-call-user-left', (data) => {
    socket.leave(data.roomId);

    const userIdsInRoom = roomToIDs.get(data.roomId) || []; // Get the array of user IDs in the room
    const updatedUserIds = userIdsInRoom.filter(userId => userId !== data.peerId); // Remove the user ID of the user who left
    roomToIDs.set(data.roomId, updatedUserIds);
    console.log("User: "+data.peerId+" left the room.\nCurrent users in room : "+roomToIDs.get(data.roomId));


    console.log("User left the room\nCurrent users in room : "+roomToIDs.get(data.roomId).length);
    
    io.to(data.roomId).emit('group-call-user-left', {
      streamId: data.streamId
    });
  });

  socket.on('group-call-closed-by-host', (data) => {
    groupCallRooms = groupCallRooms.filter(room => room.peerId !== data.peerId);
    io.sockets.emit('broadcast', {
      event: broadcastEventTypes.GROUP_CALL_ROOMS,
      groupCallRooms
    });
  });
});
