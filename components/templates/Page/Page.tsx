import React, { FC, memo, ReactNode } from "react";
import Header from "components/organisms/Header";
import styles from "./Page.module.css";

type Props = {
  readonly children: ReactNode;
};

const Page: FC<Props> = ({ children }) => (
  <div className={styles.root}>
    <div className={styles.activeArea}>
      <Header />
      {children}
    </div>
  </div>
);

export default memo(Page);
