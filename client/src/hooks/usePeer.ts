import { useEffect } from "react";

export default function useWs(url = '//localhost:3000') {
  console.log(window.location);
  useEffect(() => {
    let socketIO: SocketIOClient.Socket;
    if (typeof io === 'undefined') {
      const script = document.createElement('script');
      document.head.appendChild(script);
      script.addEventListener('load', () => {
        socketIO = io(url);
        socketIO.on('connect', (...args: Array<unknown>) => {
          console.log('connect => ', socketIO, args);
        });

        socketIO.on('disconnect', (...args: Array<unknown>) => {
          console.log('disconnect => ', socketIO, args);
        });

        socketIO.on('error', (...args: Array<unknown>) => {
          console.log('error => ', socketIO, args);
        });

        socketIO.on('message', (...args: Array<unknown>) => {
          console.log('message => ', socketIO, args);
        });

      });

      script.src = `${url}/socket.io/socket.io.js`;
    }

    return () => {
      socketIO.close();
    };
  }, [url]);
};
