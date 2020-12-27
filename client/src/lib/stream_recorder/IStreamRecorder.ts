import { IStreamRecorderListeners } from "./IStreamRecorderListeners";

export interface IStreamRecorder {
    getMediaStream(mediaStreamConstraints?:  MediaStreamConstraints): Promise<MediaStream>;

    getRecordingState(): RecordingState | undefined;

    pauseRecording(): void;

    setRecorderListeners(streamRecorderListeners: IStreamRecorderListeners): void;

    startRecording(mediaRecorderOptions?: MediaRecorderOptions, mediaStream?: MediaStream): Promise<Blob>;

    stopRecording(): void;
}
