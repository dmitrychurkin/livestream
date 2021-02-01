import { useState, useCallback, SetStateAction, Dispatch } from "react";
import StreamRecorder, {
  IStreamRecorderFacade,
  MediaRecorderFactory,
  StreamProvider,
} from "lib/stream_recorder";

type HandlerFn = () => void;
type MediaRecorderHookReturnValue = {
  readonly recordingState: RecordingState | undefined;
  readonly stream: MediaStream | null;
  readonly blob: Blob | null;
  readonly initStream: (
    mediaStreamConstraints?: MediaStreamConstraints
  ) => void;
  readonly closeStream: HandlerFn;
  readonly onRecord: (
    mediaStream: MediaStream,
    mediaRecorderOptions?: MediaRecorderOptions
  ) => void;
  readonly onStop: HandlerFn;
  readonly onResume: HandlerFn;
  readonly onPause: HandlerFn;
  readonly setBlob: Dispatch<SetStateAction<Blob | null>>;
};

export const useMediaRecorder: () => MediaRecorderHookReturnValue = () => {
  const [recordingState, setRecordingState] = useState<RecordingState>();

  const [mediaRecorder] = useState<IStreamRecorderFacade>(() => {
    const mediaRecorderInstance = new StreamRecorder(
      new StreamProvider(),
      new MediaRecorderFactory()
    );

    const setRState = () => {
      setRecordingState(mediaRecorderInstance.getRecordingState());
    };

    mediaRecorderInstance.setRecorderListeners({
      onstart: setRState,
      onstop: setRState,
      onresume: setRState,
      ondataavailable: setRState,
      onpause: setRState,
      onerror: setRState,
    });

    return mediaRecorderInstance;
  });

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [blob, setBlob] = useState<Blob | null>(null);

  const initStream = useCallback(
    async (mediaStreamConstraints?: MediaStreamConstraints) => {
      setStream(await mediaRecorder.getMediaStream(mediaStreamConstraints));
    },
    [mediaRecorder]
  );

  const onRecord = useCallback(
    async (
      mediaStream: MediaStream,
      mediaRecorderOptions?: MediaRecorderOptions
    ) => {
      setBlob(
        await mediaRecorder.startRecording(mediaStream, mediaRecorderOptions)
      );
    },
    [mediaRecorder]
  );

  const closeStream = useCallback(() => {
    setStream((streamState) => {
      if (streamState) {
        mediaRecorder.closeMediaStream(streamState);
      }
      return null;
    });
  }, [mediaRecorder]);

  const onStop = useCallback(() => {
    mediaRecorder.stopRecording();
    closeStream();
  }, [mediaRecorder, closeStream]);

  const onResume = useCallback(() => {
    mediaRecorder.resumeRecording();
  }, [mediaRecorder]);

  const onPause = useCallback(() => {
    mediaRecorder.pauseRecording();
  }, [mediaRecorder]);

  return {
    recordingState,
    stream,
    blob,
    setBlob,
    initStream,
    closeStream,
    onRecord,
    onResume,
    onPause,
    onStop,
  };
};
