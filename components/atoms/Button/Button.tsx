import clsx from "clsx";
import React, { FC, ButtonHTMLAttributes, ReactElement, memo } from "react";
import styles from "./Button.module.css";

export enum ButtonVariants {
  contained = "contained",
  text = "text",
  round = "round",
}

type Props = {
  readonly variant?: ButtonVariants;
  readonly startIcon?: ReactElement;
  readonly endIcon?: ReactElement;
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
  variant: ButtonVariants.text,
};

export default memo(Button);
