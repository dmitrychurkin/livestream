import { RecorderContext } from "context/Recorder";
import { useCallback, useContext, useState } from "react";

export default function useMediaRecorder() {
  const mediaRecorder = useContext(RecorderContext);

  const [stream, setStream] = useState<MediaStream>();
  const [blob, setBlob] = useState<Blob>();
  const [recordingState, setRecordingState] = useState<RecordingState>();

  const onInit = useCallback(async () => {
    setStream(
      await mediaRecorder.getMediaStream()
    );
  }, [mediaRecorder]);

  const onRecord = useCallback(async () => {
    const setRState = () => {
      setRecordingState(mediaRecorder.getRecordingState())
    };

    setBlob(
      await mediaRecorder.startRecording({
        onStart: setRState,
        onStop: setRState
      })
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
    onInit,
    onRecord,
    onStop
  };
}
