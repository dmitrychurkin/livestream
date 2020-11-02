import type { FastifyInstance } from "fastify";

export default (_: FastifyInstance) => {
  // app.get('/ws', { websocket: true }, (connection, req) => {
  //   connection.socket.on('close', (code, reason) => {
  //     console.log('code, reason => ', code, reason);
  //   });
  //   connection.socket.on('message', message => {
  //     // message === 'hi from client'
  //     console.log(message, req);
  //     connection.socket.send('hi from server');
  //   })
  // })
};
