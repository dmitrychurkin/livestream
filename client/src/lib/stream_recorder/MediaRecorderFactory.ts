import AbstractRecorderFactory from "./AbstractRecorderFactory";

export default class MediaRecorderFactory implements AbstractRecorderFactory<MediaStream, MediaRecorderOptions, MediaRecorder> {
    createRecorder(stream: MediaStream, options?: MediaRecorderOptions): MediaRecorder {
        return new MediaRecorder(stream, options);
    }
}