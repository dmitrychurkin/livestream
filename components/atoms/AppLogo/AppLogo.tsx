import React, { FC, memo } from "react";
import Link from "next/link";
import clsx from "clsx";
import LogoIcon from "components/icons/LogoIcon.svg";
import styles from "./AppLogo.module.css";

type Props = {
  readonly className?: string;
};

const AppLogo: FC<Props> = ({ className }) => (
  <Link href="/">
    <div className={clsx(styles.root, className)}>
      <LogoIcon />
    </div>
  </Link>
);

export default memo(AppLogo);
