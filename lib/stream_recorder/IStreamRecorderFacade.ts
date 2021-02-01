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
    mediaRecorderOptions?: MediaRecorderOptions,
    mediaStream?: MediaStream
  ): Promise<Blob>;

  stopRecording(): void;
}
