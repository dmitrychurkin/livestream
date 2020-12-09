import React, { memo } from 'react';
import Icon from '../glyphs/Icon';
import style from './Header.module.css';

const Header = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        Logo
        <div className={style.menu}>
          <div className={style.menuItem}>
            <Icon name="person-outlined" fill="none" />
            Profile
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Header);

