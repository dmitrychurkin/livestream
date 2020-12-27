import AbstractRecorderFactory from "./AbstractRecorderFactory";
import AbstractStreamProvider from "./AbstractStreamProvider";
import { IStreamRecorder } from "./IStreamRecorder";
import { IStreamRecorderListeners } from "./IStreamRecorderListeners";

export default class StreamRecorder implements IStreamRecorder {
    private static mediaStreamConstraints = { audio: true, video: true };

    private streamRecorderListeners: IStreamRecorderListeners = {};
    private mediaRecorder!: MediaRecorder;

    constructor(
        private streamProvider: AbstractStreamProvider<Promise<MediaStream>, MediaStreamConstraints>,
        private recorderFactory: AbstractRecorderFactory<MediaStream, MediaRecorderOptions, MediaRecorder>
    ) { }

    closeMediaStream(mediaStream: MediaStream): void {
        mediaStream.getTracks().forEach(track => {
            track.stop();
        });
    }

    getMediaStream(mediaStreamConstraints?: MediaStreamConstraints): Promise<MediaStream> {
        return this.streamProvider.getStream(mediaStreamConstraints ?? StreamRecorder.mediaStreamConstraints);
    }

    getRecordingState(): RecordingState | undefined {
        return this.mediaRecorder?.state;
    }

    pauseRecording(): void {
        return this.mediaRecorder?.pause();
    }

    async startRecording(mediaRecorderOptions?: MediaRecorderOptions, mediaStream?: MediaStream): Promise<Blob> {
        const stream = mediaStream ?? await this.getMediaStream(StreamRecorder.mediaStreamConstraints);
        const mediaRecorder = this.mediaRecorder = this.recorderFactory.createRecorder(stream, mediaRecorderOptions);

        mediaRecorder.start();

        mediaRecorder.onpause = this.streamRecorderListeners.onpause ?? null;
        mediaRecorder.onresume = this.streamRecorderListeners.onresume ?? null;
        mediaRecorder.onstart = this.streamRecorderListeners.onstart ?? null;
        mediaRecorder.onstop = this.streamRecorderListeners.onstop ?? null;

        return new Promise((resolve, reject) => {
            mediaRecorder.ondataavailable = (e: BlobEvent) => {
                this.streamRecorderListeners.ondataavailable?.(e);
                resolve(e.data);
            };
            mediaRecorder.onerror = err => {
                this.streamRecorderListeners.onerror?.(err);
                reject(err);
            };
        });
    }

    stopRecording(): void {
        return this.mediaRecorder?.stop();
    }

    setRecorderListeners(streamRecorderListeners: IStreamRecorderListeners): void {
        this.streamRecorderListeners = streamRecorderListeners;
    }
}