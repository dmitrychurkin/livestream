import React, { memo } from 'react';
import clsx from 'clsx';
import style from './SmallCard.module.css';

type Props = {
  readonly image: string;
  readonly name: string; 
  readonly date: string; 
  readonly size: string; 
  readonly className?: string;
};

const SmallCard: React.FC<Props> = (props) => {
  return (
    <div className={clsx(style.card, props.className)}>
      <div className={style.image}>
        {props.image || "Image"}
      </div>
      <div className={style.content}>
        <div className={style.filename}>
          {props.name || "Video file with a lengthy name that takes more than one line"}
        </div>
        <div className={style.info}>
          {props.date || "22 Nov 2020"} • {props.size || "20 Mb"}
        </div>
      </div>
    </div>
  );
};

export default memo(SmallCard);
