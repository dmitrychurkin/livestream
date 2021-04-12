import React, { FC, memo, ReactNode, useEffect, useRef } from "react";
import Button from "components/atoms/Button";
import ActionPane, { ActionPaneToolbar } from "components/molecules/ActionPane";
import CloseIcon from "components/icons/Cross.svg";
import styles from "./VideoPane.module.css";

type Props = {
  readonly stream: MediaStream | null;
  readonly className?: string;
  readonly data: Blob | null;
  readonly children: ReactNode;
  readonly onPaneClose: () => void;
};

const VideoPane: FC<Props> = ({
  className,
  stream,
  data,
  children,
  onPaneClose,
}) => {
  const videoStreamRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const { current: videoStreamEl } = videoStreamRef;
    let blobUrl: string;
    let isSrcObjectSupported = false;
    if (videoStreamEl) {
      isSrcObjectSupported = typeof videoStreamEl.srcObject === "object";
      if (data) {
        videoStreamEl.src = blobUrl = URL.createObjectURL(data);
      } else if (stream) {
        if (isSrcObjectSupported) {
          videoStreamEl.srcObject = stream;
        } else {
          videoStreamEl.src = blobUrl = URL.createObjectURL(stream);
        }
      }
    }

    return () => {
      if (videoStreamEl && isSrcObjectSupported) {
        videoStreamEl.srcObject = null;
      }
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
      }
    };
  }, [stream, data]);

  return (
    <ActionPane className={className}>
      <ActionPaneToolbar
        controls={[
          <Button key="closeBtn" onClick={onPaneClose}>
            <CloseIcon />
          </Button>,
        ]}
      >
        {children}
      </ActionPaneToolbar>
      <div className={styles.videoContainer}>
        <video
          ref={videoStreamRef}
          controls={Boolean(data)}
          muted={!data}
          autoPlay={!data}
        />
      </div>
    </ActionPane>
  );
};

export default memo(VideoPane);
