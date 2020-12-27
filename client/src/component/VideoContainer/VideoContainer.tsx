import { RefObject } from 'react';
import React, { memo } from 'react';
import Icon from '../glyphs/Icon';
import ButtonRect from '../buttons/ButtonRect';
import style from './VideoContainer.module.css';
import Screen from 'component/Screen';

type Props = {
  readonly onClose: () => void;
  readonly videoRef: RefObject<HTMLVideoElement>;
};

const VideoContainer: React.FC<Props> = ({ onClose, videoRef }) => {
  return (
    <div className={style.container}>
      <div className={style.header}>
        <div className={style.videoName}>
          Video name
        </div>
        {/* <div className={style.control}> */}
          <ButtonRect onClick={onClose} className={style.control}>
            <Icon name='cross' />
          </ButtonRect>
        {/* </div> */}
      </div>
      <div className={style.preview}>
        <Screen ref={videoRef} />
      </div>
    </div>
  )
}

export default memo(VideoContainer);
