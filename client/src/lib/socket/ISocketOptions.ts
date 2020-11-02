export interface ISocketOptions {
  readonly url: string;
  readonly connectOpts?: SocketIOClient.ConnectOpts
}