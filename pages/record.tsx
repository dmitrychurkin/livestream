import { FC, useCallback, useState } from "react";
import clsx from "clsx";
import Page from "components/templates/Page";
import VideoPane from "components/organisms/VideoPane";
import Button, { ButtonVariantEnum } from "components/atoms/Button";
import { useMediaRecorder } from "hooks/useMediaRecorder";
import CameraIcon from "components/icons/Camera.svg";
import PauseIcon from "components/icons/Pause.svg";
import PlayIcon from "components/icons/Play.svg";
import styles from "styles/Record.module.css";

const RecordPage: FC = () => {
  const {
    initStream,
    closeStream,
    onRecord,
    onStop,
    onPause,
    onResume,
    stream,
    recordingState,
    blob,
    setBlob,
  } = useMediaRecorder();

  const [isVideoPaneActive, setVideoPaneState] = useState<boolean>(false);

  const onPaneClose = useCallback(() => {
    closeStream();
    setBlob(null);
    setVideoPaneState(false);
  }, [closeStream]);

  const onPaneOpen = useCallback(() => {
    setVideoPaneState(true);
    initStream();
  }, [initStream]);

  const onRecordStart = useCallback(() => {
    if (stream) {
      onRecord(stream);
    }
  }, [onRecord, stream]);

  return (
    <Page isProtected title="Record">
      <main
        className={clsx(styles.root, isVideoPaneActive && styles.rootActive)}
      >
        {isVideoPaneActive ? (
          <>
            <VideoPane
              className={styles.pane}
              stream={stream}
              data={blob}
              onPaneClose={onPaneClose}
            >
              <div>{"New recording"}</div>
              <div className={styles.duration}>15:30</div>
            </VideoPane>
            {!!stream && (
              <div className={styles.controls}>
                {!recordingState || recordingState === "inactive" ? (
                  <Button
                    variant={ButtonVariantEnum.contained}
                    startIcon={<div className={styles.recordIcon} />}
                    onClick={onRecordStart}
                  >
                    Start recording
                  </Button>
                ) : (
                  <>
                    {recordingState === "paused" ? (
                      <Button
                        variant={ButtonVariantEnum.round}
                        onClick={onResume}
                      >
                        <PlayIcon />
                      </Button>
                    ) : (
                      <Button
                        variant={ButtonVariantEnum.round}
                        onClick={onPause}
                      >
                        <PauseIcon />
                      </Button>
                    )}
                    <Button
                      className={styles.stopControl}
                      variant={ButtonVariantEnum.round}
                      onClick={onStop}
                    >
                      <div className={styles.stopIcon} />
                    </Button>
                  </>
                )}
              </div>
            )}
          </>
        ) : (
          <Button
            className={styles.paneTrigger}
            variant={ButtonVariantEnum.contained}
            startIcon={<CameraIcon />}
            onClick={onPaneOpen}
          >
            Record new video
          </Button>
        )}
      </main>
    </Page>
  );
};

export default RecordPage;
