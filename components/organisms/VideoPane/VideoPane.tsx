import React, { FC, memo, ReactNode, useEffect, useRef } from "react";
import Button from "components/atoms/Button";
import ActionPane, { ActionPaneToolbar } from "components/molecules/ActionPane";
import CloseIcon from "components/icons/Cross.svg";

type Props = {
  readonly stream?: MediaStream | null;
  readonly className?: string;
  readonly data?: Blob;
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
  const videoRecordRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const { current: videoStreamEl } = videoStreamRef;
    let blobUrl: string;
    if (videoStreamEl && stream) {
      if (typeof videoStreamEl.srcObject === "object") {
        videoStreamEl.srcObject = stream;
      } else {
        videoStreamEl.src = blobUrl = URL.createObjectURL(stream);
      }
    }

    return () => {
      blobUrl && URL.revokeObjectURL(blobUrl);
      if (videoStreamEl && stream) {
        (videoStreamEl.srcObject as MediaStream)
          .getTracks()
          .forEach((track) => {
            track.stop();
          });
        videoStreamEl.srcObject = null;
      }
    };
  }, [stream]);

  useEffect(() => {
    const { current: videoRecordEl } = videoRecordRef;
    let blobUrl: string;
    if (videoRecordEl && data) {
      videoRecordEl.src = blobUrl = URL.createObjectURL(data);
    }
    return () => {
      blobUrl && URL.revokeObjectURL(blobUrl);
    };
  }, [data]);

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
      {data ? (
        <video controls ref={videoRecordRef} />
      ) : (
        <video autoPlay muted ref={videoStreamRef} />
      )}
    </ActionPane>
  );
};

export default memo(VideoPane);
