import { RecorderContext } from "context/Recorder";
import { useCallback, useContext, useEffect, useState } from "react";

export default function useMediaRecorder() {
  const mediaRecorder = useContext(RecorderContext);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [blob, setBlob] = useState<Blob>();
  const [recordingState, setRecordingState] = useState<RecordingState>();

  useEffect(() => {
    const setRState = () => {
      setRecordingState(mediaRecorder.getRecordingState())
    };

    mediaRecorder.setRecorderListeners({
      onstart: setRState,
      onstop: setRState
    });
  }, [mediaRecorder]);

  const initStream = useCallback(async () => {
    const mediaStream = await mediaRecorder.getMediaStream();
    setStream(mediaStream);
    return mediaStream;
  }, [mediaRecorder]);

  const closeStream = useCallback((mediaStream?: MediaStream) => {
    if (mediaStream) {
      mediaRecorder.closeMediaStream(mediaStream);
    }else {
      setStream(streamState => {
        if (streamState) {
          mediaRecorder.closeMediaStream(streamState);
        }
        return null;
      });
    }
  }, [mediaRecorder]);

  const onRecord = useCallback(async () => {
    setBlob(
      await mediaRecorder.startRecording()
    );
  }, [mediaRecorder]);

  const onStop = useCallback(() => {
    mediaRecorder.stopRecording();
    setRecordingState(mediaRecorder.getRecordingState());
  }, [mediaRecorder]);

  return {
    recordingState,
    stream,
    blob,
    initStream,
    closeStream,
    onRecord,
    onStop
  };
}
