export interface IMediaStreamable {
  closeMediaStream(mediaStream: MediaStream): boolean;

  getMediaStream(
    mediaStreamConstraints?: MediaStreamConstraints
  ): Promise<MediaStream>;
}
