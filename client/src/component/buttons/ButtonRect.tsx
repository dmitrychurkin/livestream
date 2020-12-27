import React, { memo, ReactNode } from "react";
import clsx from "clsx";
import style from "./ButtonRect.module.css";

type Props = {
  readonly children: ReactNode;
  readonly className?: string;
  readonly titleLayout?: string;
  readonly onClick: () => void;
};

const ButtonRect: React.FC<Props> = ({ children, className, titleLayout, onClick }) => {
  return (
    <button 
      className={clsx(style.wrapper, className)}
      onClick={onClick}
    >
      <div className={clsx(titleLayout)}>{children}</div>
    </button>
  );
};

export default memo(ButtonRect);
