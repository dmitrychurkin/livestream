import { IStreamRecorderListeners } from "./IStreamRecorderListeners";

export interface IMediaRecordable {
  getRecordingState(): RecordingState | undefined;

  pauseRecording(): void;

  resumeRecording(): void;

  setRecorderListeners(streamRecorderListeners: IStreamRecorderListeners): void;

  startRecording(
    mediaRecorderOptions?: MediaRecorderOptions,
    mediaStream?: MediaStream
  ): Promise<Blob>;

  stopRecording(): void;
}
