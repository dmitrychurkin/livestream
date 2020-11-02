import SimplePeer from 'simple-peer';

export type PeerOptions = SimplePeer.Options;
export type PeerInstance = SimplePeer.Instance;
export type PeerSignalData = SimplePeer.SignalData;

export default class Peer {

  create(options: PeerOptions): PeerInstance {
    return new SimplePeer(options);
  }

  beginSignaling(peer: PeerInstance): Promise<PeerSignalData> {
    return new Promise(resolve => {
      peer.on('signal', resolve);
    });
  }

  sendSignal(peer: PeerInstance, offer: PeerSignalData): Peer {
    peer.signal(offer);
    return this;
  }

  async getUserMedia(constraints:  MediaStreamConstraints = { video: true, audio: true }) {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      return mediaStream;
    }catch (err) {
      throw err;
    }
  }

  addStream(peer: PeerInstance, mediaStream: MediaStream): Peer {
    peer.addStream(mediaStream);
    return this;
  }

  receiveForeignStream(peer: PeerInstance): Promise<MediaStream> {
    return new Promise(resolve => {
      peer.on('stream', resolve);
    });
  }

  // private isClient() {
  //   return window.location.pathname.includes('/client')
  // }

  // private isOperator() {
  //   return window.location.pathname.includes('/operator');
  // }
}