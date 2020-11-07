import React, { memo, RefObject, useEffect, useRef } from 'react';
import Screen from 'component/Screen';

import useMediaRecorder from 'hooks/useMediaRecorder';

import style from './Layout.module.css';


const Layout = () => {
  const hostVideoRef = useRef() as RefObject<HTMLVideoElement>;
  const recordVideoRef = useRef() as RefObject<HTMLVideoElement>;
  const { recordingState, stream, blob, onInit, onRecord, onStop } = useMediaRecorder();

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
      <Screen ref={hostVideoRef} className={style.foreign} />
      <Screen ref={recordVideoRef} className={style.host} controls />
      <div className={style.actionBar}>
        <button
          className={style.handler}
          onClick={onInit}
          disabled={typeof stream !== 'undefined'}
        >
          Показать ебальник
        </button>
        <button
          className={style.handler}
          onClick={onRecord}
          disabled={
            typeof stream === 'undefined' ||
            recordingState === 'recording'
          }
        >
          Пиши
        </button>
        <button
          className={style.handler}
          onClick={onStop}
          disabled={
            typeof stream === 'undefined' ||
            typeof recordingState === 'undefined' ||
            recordingState === 'inactive'
          }
        >
          Хорош
        </button>
      </div>
    </div>
  );
};

export default memo(Layout);
