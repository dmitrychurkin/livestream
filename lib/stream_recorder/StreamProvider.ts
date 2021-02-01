import AbstractStreamProvider from "./AbstractStreamProvider";

export default class StreamProvider
  implements AbstractStreamProvider<MediaStream, MediaStreamConstraints> {
  public disposeStream(mediaStream: MediaStream): boolean {
    mediaStream.getTracks().forEach((track) => {
      track.stop();
    });
    return true;
  }
  public getStream(
    mediaStreamConstraints: MediaStreamConstraints
  ): Promise<MediaStream> {
    return navigator.mediaDevices.getUserMedia(mediaStreamConstraints);
  }
}
