import PeerService, { PeerInstance, PeerOptions, PeerSignalData } from "../peer";
import SocketService, { ISocketOptions, SocketInstance } from "../socket";
import { EventEnum } from "./EventEnum";

export default class Connector {

  private socketClient!: SocketInstance;
  private peer!: PeerInstance;

  constructor(
    private socketService: SocketService<EventEnum, PeerSignalData>,
    private peerService: PeerService
  ) {}

  async connect(socketOptions: ISocketOptions, peerOptions: PeerOptions) {
    await this.createSocketConnection(socketOptions);
    const signalData = await this.createPeerConnection(peerOptions);
    console.log('signalData => ', signalData);
    this.socketService.emit(this.socketClient, EventEnum.OFFER, signalData);
  }

  private async createSocketConnection(socketOptions: ISocketOptions): Promise<void> {
    try {
      this.socketClient = await this.socketService.createSocket(socketOptions);
      await this.socketService.establishConnection(this.socketClient);
    }catch(err) {
      throw err;
    }
  }

  private async createPeerConnection(peerOptions: PeerOptions): Promise<PeerSignalData> {
    this.peer = this.peerService.create(peerOptions);
    const signalData = await this.peerService.beginSignaling(this.peer);
    return signalData;
  }

  // private setHandlers(client: SocketIOClient.Socket) {
  //   client
  //     .on('connect', (...args: Array<unknown>) => {
  //       console.log('connect => ', client, args);
  //     })
  //     .on('disconnect', (...args: Array<unknown>) => {
  //       console.log('disconnect => ', client, args);
  //     })
  //     .on('error', (...args: Array<unknown>) => {
  //       console.log('error => ', client, args);
  //     })
  //     .on('message', (...args: Array<unknown>) => {
  //       console.log('message => ', client, args);
  //     });
  // }

}

