import type { GetServerSidePropsContext } from "next";
import { providers } from "next-auth/client";
import { AppProvider } from "next-auth/providers";
import type { SSRConfig } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { FC } from "react";

type Prop = {
  readonly providers: Record<string, AppProvider> | null;
};

const SignupPage: FC<Prop> = () => {
  return <div />;
};

type SignupPageProps = {
  readonly props: Prop & SSRConfig;
};

export async function getStaticProps({
  locale = "",
}: GetServerSidePropsContext): Promise<SignupPageProps> {
  const [authProviders, nexti18SSRConfig] = await Promise.all([
    providers(),
    serverSideTranslations(locale, ["login-page", "validation-messages"]),
  ]);
  return {
    props: {
      ...nexti18SSRConfig,
      providers: authProviders,
    },
  };
}

export default SignupPage;
