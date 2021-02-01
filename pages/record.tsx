import { FC, useCallback, useState } from "react";
import clsx from "clsx";
import Page from "components/templates/Page";
import VideoPane from "components/organisms/VideoPane";
import Button, { ButtonVariants } from "components/atoms/Button";
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
  } = useMediaRecorder();

  const [isVideoPaneActive, setVideoPaneState] = useState<boolean>(false);

  const onPaneClose = useCallback(() => {
    closeStream();
    setVideoPaneState(false);
  }, [closeStream]);

  const onPaneOpen = useCallback(() => {
    setVideoPaneState(true);
    initStream();
  }, [initStream]);

  return (
    <Page>
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
                    variant={ButtonVariants.contained}
                    startIcon={<div className={styles.recordIcon} />}
                    onClick={onRecord}
                  >
                    Start recording
                  </Button>
                ) : (
                  <>
                    {recordingState === "paused" ? (
                      <Button variant={ButtonVariants.round} onClick={onResume}>
                        <PlayIcon />
                      </Button>
                    ) : (
                      <Button variant={ButtonVariants.round} onClick={onPause}>
                        <PauseIcon />
                      </Button>
                    )}
                    <Button
                      className={styles.stopControl}
                      variant={ButtonVariants.round}
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
            variant={ButtonVariants.contained}
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
