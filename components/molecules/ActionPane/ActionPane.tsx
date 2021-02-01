import clsx from "clsx";
import React, { FC, memo, ReactNode } from "react";
import styles from "./ActionPane.module.css";

type Props = {
  readonly children: ReactNode;
  readonly className?: string;
};

const ActionPane: FC<Props> = ({ children, className }) => (
  <div className={clsx(styles.root, className)}>{children}</div>
);

export default memo(ActionPane);
