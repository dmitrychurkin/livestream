import React, { FC, memo, PropsWithChildren } from "react";
import Head from "next/head";

type Prop = {
  readonly title: string;
};

const SeoHead: FC<PropsWithChildren<Prop>> = ({ title, children }) => (
  <Head>
    <title>{title}</title>
    {children}
    {/* TODO: add additional SEO tags here */}
  </Head>
);

export default memo(SeoHead);
