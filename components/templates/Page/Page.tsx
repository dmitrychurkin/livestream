import React, {
  FC,
  memo,
  PropsWithChildren,
  ReactNode,
  useEffect,
} from "react";
import { signIn, useSession } from "next-auth/client";
import styles from "./Page.module.css";
import SeoHead from "components/atoms/SeoHead";
import clsx from "clsx";

type Prop = {
  readonly title: string;
  readonly className?: string;
  readonly isProtected?: boolean;
  readonly headerComponent?: ReactNode;
  readonly seoHeadChildren?: ReactNode;
};

const Page: FC<PropsWithChildren<Prop>> = ({
  className,
  children,
  title,
  isProtected,
  seoHeadChildren: SeoHeadChildren,
  headerComponent: HeaderComponent,
}) => {
  const [session, isLoading] = useSession();

  useEffect(() => {
    if (isProtected && !isLoading && !session) {
      signIn();
    }
  }, [isProtected, session, isLoading]);

  if (isProtected && !session) {
    return null;
  }

  return (
    <>
      <SeoHead title={title}>{SeoHeadChildren}</SeoHead>
      <div
        className={clsx(
          styles.root,
          Boolean(HeaderComponent) && styles.withHeader,
          className
        )}
      >
        <div className={styles.activeArea}>
          {HeaderComponent}
          {children}
        </div>
      </div>
    </>
  );
};

export default memo(Page);
