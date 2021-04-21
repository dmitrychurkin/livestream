import clsx from "clsx";
import React, { FC, InputHTMLAttributes, memo } from "react";

import styles from "./TextField.module.css";

const TextField: FC<InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input {...props} className={clsx(styles.root, props.className)} />
);

export default memo(TextField);
