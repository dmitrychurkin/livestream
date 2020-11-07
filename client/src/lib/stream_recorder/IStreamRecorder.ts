export interface IStreamRecorder {
    getMediaStream(mediaStreamConstraints?:  MediaStreamConstraints): Promise<MediaStream>;

    startRecording(mediaRecorderCallbacks?: IMediaRecorderCallbacks, mediaRecorderOptions?: MediaRecorderOptions): Promise<Blob>;

    stopRecording(): void;

    pauseRecording(): void;

    getRecordingState(): RecordingState | undefined;
}

export interface IMediaRecorderCallbacks {
    onStart?: EventListener;
    onStop?: EventListener;
    onResume?: EventListener;
    onPause?: EventListener;
}
