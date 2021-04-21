import { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { Provider as AuthProvider } from "next-auth/client";

import "styles/globals.css";

function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <AuthProvider session={pageProps.session}>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default appWithTranslation(App);
