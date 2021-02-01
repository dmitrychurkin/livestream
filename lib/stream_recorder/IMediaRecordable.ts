import { IStreamRecorderListeners } from "./IStreamRecorderListeners";

export interface IMediaRecordable {
  getRecordingState(): RecordingState | undefined;

  pauseRecording(): void;

  resumeRecording(): void;

  setRecorderListeners(streamRecorderListeners: IStreamRecorderListeners): void;

  startRecording(
    mediaStream: MediaStream,
    mediaRecorderOptions?: MediaRecorderOptions
  ): Promise<Blob>;

  stopRecording(): void;
}
