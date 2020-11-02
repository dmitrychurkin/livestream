import React, { memo, useCallback, useContext } from 'react';
import Screen from 'component/Screen';

import { ConnectionContext } from 'context/Connection';

import style from './Layout.module.css';


const Layout = () => {
  const connector = useContext(ConnectionContext);
  const onClick = useCallback(() => {
    const isClient = window.location.pathname.includes('/client');
    connector?.connect({ url: 'http://localhost:3000', connectOpts: { query: isClient ? 'userType=initiator' : undefined } }, { initiator: isClient });
  }, [connector]);

  return (
    <div className={style.root}>
      <Screen className={style.foreign} />
      <Screen className={style.host} />
      <button className={style.handler} onClick={onClick}>Пиздец</button>
    </div>
  );
};

export default memo(Layout);
