import clsx from "clsx";
import React, { FC, memo, ReactElement, ReactNode } from "react";
import styles from "./ActionPane.module.css";

type Props = {
  readonly children: ReactNode;
  readonly className?: string;
  readonly controls?: Array<ReactElement>;
};

const ActionPaneToolbar: FC<Props> = ({ children, className, controls }) => (
  <div className={clsx(styles.toolbar, className)}>
    {children}
    {Array.isArray(controls) && (
      <div className={styles.controls}>
        {controls.map((Control) => Control)}
      </div>
    )}
  </div>
);

export default memo(ActionPaneToolbar);
