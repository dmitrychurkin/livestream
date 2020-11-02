import { ISocketOptions } from "./ISocketOptions";

export type SocketInstance = SocketIOClient.Socket;

export default class Socket<E extends string, D> {

  async createSocket(options: ISocketOptions): Promise<SocketInstance> {
    try {
      const { url, connectOpts } = options;
      const socketFactory = await this.load(`${url}/socket.io/socket.io.js`);
      return socketFactory(url, connectOpts);
    }catch(err) {
      throw err;
    }
  }

  establishConnection(socketClient: SocketInstance) {
    return new Promise(resolve => {
      socketClient
        .on('connect', resolve);
    });
  }

  emit(socketClient: SocketInstance, eventName: E, data: D): SocketInstance {
    return socketClient.emit(eventName, data);
  }

  disconnect(client: SocketInstance) {
    client.close();
  }

  private get isExists(): boolean {
    return typeof window.io === 'function';
  }

  private get socketFactory(): SocketIOClientStatic {
    return window.io;
  }

  private load(endpointUrl: string): Promise<SocketIOClientStatic> {
    return new Promise((resolve, reject) => {
      if (this.isExists) {
        resolve(this.socketFactory);
      }else {
        const script = document.createElement('script');
        script.src = endpointUrl;
        document.head.appendChild(script);
        script.addEventListener('load', () => resolve(this.socketFactory));
        script.addEventListener('error', reject);
      }
    });
  }
}
