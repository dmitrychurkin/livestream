import { IStreamRecorderListeners } from "./IStreamRecorderListeners";

export interface IStreamRecorderFacade {
  closeMediaStream(mediaStream: MediaStream): void;

  getMediaStream(
    mediaStreamConstraints?: MediaStreamConstraints
  ): Promise<MediaStream>;

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
