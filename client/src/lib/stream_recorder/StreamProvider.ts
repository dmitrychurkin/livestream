import AbstractStreamProvider from "./AbstractStreamProvider";

export default class StreamProvider implements AbstractStreamProvider<Promise<MediaStream>, MediaStreamConstraints> {
    getStream(mediaStreamConstraints: MediaStreamConstraints): Promise<MediaStream> {
        return navigator.mediaDevices.getUserMedia(mediaStreamConstraints);
    }
}