import React, { FC, memo } from "react";
import Link from "next/link";
import clsx from "clsx";
import styles from "./AppLogo.module.css";

type Props = {
  readonly className?: string;
};

const AppLogo: FC<Props> = ({ className }) => (
  <Link href="/">
    <div className={clsx(styles.root, className)}>AppLogo</div>
  </Link>
);

export default memo(AppLogo);
