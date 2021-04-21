import clsx from "clsx";
import React, { FC, ButtonHTMLAttributes, memo, ReactNode } from "react";
import styles from "./Button.module.css";
import { ButtonVariantEnum } from "./ButtonVariantEnum";

type Props = {
  readonly variant?: ButtonVariantEnum;
  readonly startIcon?: ReactNode;
  readonly endIcon?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<Props> = ({
  className,
  children,
  variant,
  startIcon: StartIcon,
  endIcon: EndIcon,
  ...restProps
}) => (
  <button
    {...restProps}
    className={clsx(styles.root, variant && styles[variant], className)}
  >
    {StartIcon}
    {children}
    {EndIcon}
  </button>
);

Button.defaultProps = {
  variant: ButtonVariantEnum.text,
};

export default memo(Button);
