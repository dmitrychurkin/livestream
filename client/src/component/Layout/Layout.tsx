import React, { memo, RefObject, useEffect, useRef } from 'react';
import Screen from 'component/Screen';

import useMediaRecorder from 'hooks/useMediaRecorder';

import style from './Layout.module.css';
import { gql, useMutation } from '@apollo/client';


const MUTATION = gql`
  mutation($file: Upload!) {
    uploadFile(file: $file)
  }
`;

const Layout = () => {
  const hostVideoRef = useRef() as RefObject<HTMLVideoElement>;
  const recordVideoRef = useRef() as RefObject<HTMLVideoElement>;
  const [mutate] = useMutation(MUTATION);
  const { recordingState, stream, blob, onInit, onRecord, onStop } = useMediaRecorder();

  useEffect(() => {
    const { current: hostVideoEl } = hostVideoRef;
    if (hostVideoEl) {
      hostVideoEl.srcObject = stream;
      if (stream) {
        hostVideoEl.play();
      }
    }
  }, [stream]);

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

  return (
    <div className={style.root}>
      <Screen ref={hostVideoRef} className={style.foreign} />
      <Screen ref={recordVideoRef} className={style.host} controls />
      <div className={style.actionBar}>
        <button
          className={style.handler}
          onClick={onInit}
          disabled={stream !== null}
        >
          Показать ебальник
        </button>
        <button
          className={style.handler}
          onClick={onRecord}
          disabled={
            stream === null ||
            recordingState === 'recording'
          }
        >
          Пиши
        </button>
        <button
          className={style.handler}
          onClick={onStop}
          disabled={
            stream === null ||
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
