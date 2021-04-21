import React, { FC, memo } from "react";
import Link from "next/link";
import clsx from "clsx";
import LogoIcon from "components/icons/LogoIcon.svg";
import styles from "./AppLogo.module.css";
import { LogoVariantEnum } from "./LogoVariantEnum";

type Props = {
  readonly className?: string;
  readonly variant?: LogoVariantEnum;
};

const AppLogo: FC<Props> = ({ className, variant }) => (
  <Link href="/">
    <div
      className={clsx(
        styles.root,
        styles[variant ?? LogoVariantEnum.DEFAULT],
        className
      )}
    >
      <LogoIcon />
    </div>
  </Link>
);

export default memo(AppLogo);
