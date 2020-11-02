import { Server } from "socket.io";

export default (io: Server, storage = new Map()) => {
  io.on('connection', socket => {
    console.log('socket => ', socket);

    if (socket.handshake.query.userType) {
      storage.set('clients', ); // TODO: need db
    }

    socket.on('offer', data => {
      console.log('on message => ', data);
    });
    socket.on('disconnect', data => {
      console.log('on disconnect => ', data);
    });
  });
};
