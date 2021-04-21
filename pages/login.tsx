import { providers, signIn } from "next-auth/client";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { AppProvider } from "next-auth/providers";
import { FC, ReactNode, useCallback, useMemo } from "react";
import { SSRConfig, useTranslation } from "next-i18next";
import type { GetServerSidePropsContext } from "next";
import * as Yup from "yup";
import { Formik, Form, Field, FieldProps } from "formik";
import Page from "components/templates/Page";
import AppLogo, { LogoVariantEnum } from "components/atoms/AppLogo";
import Button, { ButtonVariantEnum } from "components/atoms/Button";

import GoogleLogoIcon from "components/icons/Google-logo.svg";
import AppleLogoIcon from "components/icons/Apple-logo.svg";

import styles from "styles/Login.module.css";
import { AuthProviderEnum } from "enum/AuthProviderEnum";
import TextField from "components/atoms/TextField";
import { useRouter } from "next/dist/client/router";

type Prop = {
  readonly providers: Record<string, AppProvider> | null;
};

const LoginPage: FC<Prop> = ({ providers }) => {
  const router = useRouter();

  const { t } = useTranslation("login-page");
  const { t: validationMessages } = useTranslation("validation-messages");

  const loginCredentialsSchema = useMemo(
    () =>
      Yup.object().shape({
        email: Yup.string()
          .email(validationMessages("email"))
          .required(validationMessages("required")),
        password: Yup.string().required(validationMessages("required")),
      }),
    [router.locale, validationMessages]
  );

  const handleProvider = useCallback(
    (provider: AppProvider) => () => signIn(provider.id),
    []
  );

  const getProviderIcon = useCallback(
    (name: string) =>
      new Map<string, ReactNode>()
        .set(AuthProviderEnum.GOOGLE, <GoogleLogoIcon />)
        .set(AuthProviderEnum.APPLE, <AppleLogoIcon />)
        .get(name),
    []
  );

  const getProviderContent = useCallback(
    (provider: AppProvider) => {
      if (AuthProviderEnum.CREDENTIALS === provider.id) {
        return (
          <Formik
            key={provider.name}
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={loginCredentialsSchema}
            validateOnMount
            onSubmit={async (
              values,
              { setSubmitting, resetForm, validateForm }
            ) => {
              setSubmitting(true);
              const result: any = await signIn(provider.id, {
                redirect: false,
                ...values,
              });
              if (!result.ok) {
                resetForm();
                setSubmitting(false);
                validateForm();
              }
            }}
          >
            {({ isValid, isSubmitting }) => (
              <Form className={styles.cred}>
                <Field name="email">
                  {({ field }: FieldProps) => (
                    <TextField
                      className={styles.field}
                      type="email"
                      placeholder={`${t("placeholder.email")} ...`}
                      {...field}
                    />
                  )}
                </Field>
                <Field name="password">
                  {({ field }: FieldProps) => (
                    <TextField
                      className={styles.field}
                      type="password"
                      placeholder={`${t("placeholder.password")} ...`}
                      {...field}
                    />
                  )}
                </Field>
                <Button
                  className={styles.btn}
                  variant={ButtonVariantEnum.contained}
                  type="submit"
                  disabled={!isValid || isSubmitting}
                >
                  {t("loginWith", { provider: AuthProviderEnum.CREDENTIALS })}
                </Button>
              </Form>
            )}
          </Formik>
        );
      }

      return (
        <Button
          key={provider.name}
          className={styles.btn}
          variant={ButtonVariantEnum.contained}
          startIcon={getProviderIcon(provider.name.toLowerCase())}
          onClick={handleProvider(provider)}
        >
          <span className={styles.btnContent}>
            {t("loginWith", { provider: provider.name })}
          </span>
        </Button>
      );
    },
    [loginCredentialsSchema, getProviderIcon, t]
  );

  return (
    <Page title={t("pageTitle")}>
      <AppLogo className={styles.logo} variant={LogoVariantEnum.ROUND} />
      <h1 className={styles.title}>{t("title", { name: "Clap" })}</h1>
      {Object.values(providers ?? {}).map(getProviderContent)}
    </Page>
  );
};

type LoginPageProps = {
  readonly props: Prop & SSRConfig;
};

export async function getStaticProps({
  locale = "",
}: GetServerSidePropsContext): Promise<LoginPageProps> {
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

export default LoginPage;
