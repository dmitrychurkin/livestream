import { useState, useCallback } from "react";
import StreamRecorder, {
  IStreamRecorderFacade,
  MediaRecorderFactory,
  StreamProvider,
} from "lib/stream_recorder";

type HandlerFn = () => void;
type MediaRecorderHookReturnValue = {
  readonly recordingState: RecordingState | undefined;
  readonly stream: MediaStream | null;
  readonly blob: Blob | undefined;
  readonly initStream: HandlerFn;
  readonly closeStream: HandlerFn;
  readonly onRecord: HandlerFn;
  readonly onStop: HandlerFn;
  readonly onResume: HandlerFn;
  readonly onPause: HandlerFn;
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
  const [blob, setBlob] = useState<Blob>();

  const initStream = useCallback(async () => {
    setStream(await mediaRecorder.getMediaStream());
  }, [mediaRecorder]);

  const onRecord = useCallback(async () => {
    setBlob(await mediaRecorder.startRecording());
  }, [mediaRecorder]);

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
    initStream,
    closeStream,
    onRecord,
    onResume,
    onPause,
    onStop,
  };
};
