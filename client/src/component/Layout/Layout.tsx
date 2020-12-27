import type { MutableRefObject, RefObject } from 'react';
import React, { memo, useEffect, useRef, useState, useCallback } from "react";
// import Screen from "component/Screen";
import Header from "component/Header";
import Recents from "component/Recents";
import ButtonRect from "component/buttons/ButtonRect";
import Icon from "component/glyphs/Icon";
import VideoContainer from "component/VideoContainer";

import useMediaRecorder from 'hooks/useMediaRecorder';

import { gql, useMutation } from '@apollo/client';

import style from "./Layout.module.css";

const MUTATION = gql`
  mutation($file: Upload!) {
    uploadFile(file: $file)
  }
`;

let mediaStreamCache: MediaStream | null = null;

const Layout = () => {
  const hostVideoRef = useRef() as MutableRefObject<HTMLVideoElement>;
  const recordVideoRef = useRef() as RefObject<HTMLVideoElement>;

  const [isVideoOpen, setVideoIsOpen] = useState<boolean>(false);

  const [mutate] = useMutation(MUTATION);

  const {
    // recordingState,
    // stream,
    blob,
    initStream,
    closeStream
    // onRecord,
    // onStop,
  } = useMediaRecorder();

  useEffect(() => {
    const { current: recordVideoEl } = recordVideoRef;
    if (blob) {
      mutate({ variables: { file: blob } });
      if (recordVideoEl) {
        recordVideoEl.src = URL.createObjectURL(blob);
        recordVideoEl.play();
      }
    }
    return () => {
      if (recordVideoEl) {
        URL.revokeObjectURL(recordVideoEl.src);
      }
    };
  }, [blob, mutate]);

  const onRecordHandler = useCallback(() => {
    setVideoIsOpen(state => {
      if (!state) {
        initStream()
          .then(mediaStream => {
            if (mediaStreamCache) {
              mediaStreamCache.getTracks().forEach(track => {
                track.stop();
              });
            }
            const { current: hostVideoEl } = hostVideoRef;
            if (hostVideoEl) {
              hostVideoEl.srcObject = mediaStream;
              hostVideoEl.play();
            }
            mediaStreamCache = mediaStream;
          });
      } else {
        closeStream();
      }
      return !state;
    });
  }, [initStream, closeStream]);

  return (
    <div className={style.root}>
      <Header />
      <div className={style.wrapper}>
        <div className={style.content}>
          {isVideoOpen && <VideoContainer onClose={onRecordHandler} videoRef={hostVideoRef} />}
          <ButtonRect onClick={onRecordHandler} className={style.buttonRec} titleLayout={style.withIcon}>
            <Icon name="camera-filled" fill="#ffffff" />
            Record new video
          </ButtonRect>
        </div>
      </div>
      <section className={style.panel}>
        <Recents />
      </section>
      {/* <Screen ref={hostVideoRef} className={style.foreign} /> */}
      {/* <Screen ref={recordVideoRef} className={style.host} controls /> */}
      {/* <div className={style.actionBar}> */}
      {/*   <button */}
      {/*     className={style.handler} */}
      {/*     onClick={onInit} */}
      {/*     disabled={typeof stream !== 'undefined'} */}
      {/*   > */}
      {/*     Показать ебальник */}
      {/*   </button> */}
      {/*   <button */}
      {/*     className={style.handler} */}
      {/*     onClick={onRecord} */}
      {/*     disabled={ */}
      {/*       typeof stream === 'undefined' || */}
      {/*       recordingState === 'recording' */}
      {/*     } */}
      {/*   > */}
      {/*     Пиши */}
      {/*   </button> */}
      {/*   <button */}
      {/*     className={style.handler} */}
      {/*     onClick={onStop} */}
      {/*     disabled={ */}
      {/*       typeof stream === 'undefined' || */}
      {/*       typeof recordingState === 'undefined' || */}
      {/*       recordingState === 'inactive' */}
      {/*     } */}
      {/*   > */}
      {/*     Хорош */}
      {/*   </button> */}
      {/* </div> */}
    </div>
  );
};

export default memo(Layout);
