import AbstractRecorderFactory from "./AbstractRecorderFactory";
import AbstractStreamProvider from "./AbstractStreamProvider";
import { IMediaRecordable } from "./IMediaRecordable";
import { IMediaStreamable } from "./IMediaStreamable";
import { IStreamRecorderListeners } from "./IStreamRecorderListeners";

export default class StreamRecorder
  implements IMediaStreamable, IMediaRecordable {
  private static mediaStreamConstraints = { audio: true, video: true };

  private streamRecorderListeners: IStreamRecorderListeners = {};
  private mediaRecorder!: MediaRecorder;

  constructor(
    private streamProvider: AbstractStreamProvider<
      MediaStream,
      MediaStreamConstraints
    >,
    private recorderFactory: AbstractRecorderFactory<
      MediaStream,
      MediaRecorderOptions,
      MediaRecorder
    >
  ) {}

  public closeMediaStream(mediaStream: MediaStream): boolean {
    return this.streamProvider.disposeStream(mediaStream);
  }

  public getMediaStream(
    mediaStreamConstraints?: MediaStreamConstraints
  ): Promise<MediaStream> {
    return this.streamProvider.getStream(
      mediaStreamConstraints ?? StreamRecorder.mediaStreamConstraints
    );
  }

  public getRecordingState(): RecordingState | undefined {
    return this.mediaRecorder?.state;
  }

  public pauseRecording(): void {
    return this.mediaRecorder?.pause();
  }

  public resumeRecording(): void {
    return this.mediaRecorder?.resume();
  }

  public async startRecording(
    mediaRecorderOptions?: MediaRecorderOptions,
    mediaStream?: MediaStream
  ): Promise<Blob> {
    const stream =
      mediaStream ??
      (await this.getMediaStream(StreamRecorder.mediaStreamConstraints));
    const mediaRecorder = (this.mediaRecorder = this.recorderFactory.createRecorder(
      stream,
      mediaRecorderOptions
    ));

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
      mediaRecorder.onerror = (err) => {
        this.streamRecorderListeners.onerror?.(err);
        reject(err);
      };
    });
  }

  public stopRecording(): void {
    return this.mediaRecorder?.stop();
  }

  public setRecorderListeners(
    streamRecorderListeners: IStreamRecorderListeners
  ): void {
    this.streamRecorderListeners = streamRecorderListeners;
  }
}
