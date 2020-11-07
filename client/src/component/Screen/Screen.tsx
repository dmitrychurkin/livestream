import clsx from 'clsx';
import type { DetailedHTMLProps, ForwardRefRenderFunction, VideoHTMLAttributes } from 'react';
import React, { forwardRef, memo } from 'react';

import style from './Screen.module.css';

type Props = {
  readonly className?: string;
  readonly srcObject?: MediaStream | Blob;
} & DetailedHTMLProps<VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>;
const Screen: ForwardRefRenderFunction<HTMLVideoElement, Props> = ({ className, ...videoElementProps }, forwardedRef) => {
  return (
    <div className={clsx(style.root, className)}>
      <video ref={forwardedRef} {...videoElementProps} />
    </div>
  );
};

export default memo(forwardRef(Screen));
