import React, { memo, RefObject, useEffect, useRef, useState, useCallback } from "react";
import Screen from "component/Screen";
import Header from "component/Header";
import Recents from "component/Recents";
import ButtonRect from "component/buttons/ButtonRect";
import Icon from "../glyphs/Icon";
import VideoContainer from "component/VideoContainer";

import useMediaRecorder from "hooks/useMediaRecorder";

import style from "./Layout.module.css";

const Layout = () => {
  const [isVideoOpen, setVideoIsOpen] = useState<boolean>(false)
  const hostVideoRef = useRef() as RefObject<HTMLVideoElement>;
  const recordVideoRef = useRef() as RefObject<HTMLVideoElement>;
  const {
    recordingState,
    stream,
    blob,
    onInit,
    onRecord,
    onStop,
  } = useMediaRecorder();

  const onRecordHandler = useCallback(() => {
    setVideoIsOpen(state => !state);
    console.log("Hello, world.");
  }, []);

  useEffect(() => {
    if (stream) {
      const { current } = hostVideoRef;
      if (current) {
        current.srcObject = stream;
        current.play();
      }
    }
  }, [stream]);

  useEffect(() => {
    const { current } = recordVideoRef;
    if (blob && current) {
      console.log(blob);
      current.src = URL.createObjectURL(blob);
      current.play();
    }
    return () => {
      if (current) {
        URL.revokeObjectURL(current.src);
      }
    };
  }, [blob]);


  return (
    <div className={style.root}>
      <Header />
      <div className={style.wrapper}>
        <div className={style.content}>
          {isVideoOpen && <VideoContainer onClose={onRecordHandler} />}
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
