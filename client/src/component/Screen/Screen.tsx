import clsx from 'clsx';
import React, { FC, memo } from 'react';

import style from './Screen.module.css';

type Props = {
  readonly className?: string;
};
const Screen: FC<Props> = ({ className }) => {
  return (
    <div className={clsx(style.root, className)}>
      <video />
    </div>
  );
};

export default memo(Screen);
