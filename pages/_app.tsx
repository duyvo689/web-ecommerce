import "../styles/globals.css";
import type { AppProps } from "next/app";
import Script from "next/script";
import { ReactElement } from "react";
import { NextPageWithLayout } from "../utils/core";
import { store } from "../stores/store";
import { Provider } from "react-redux";

interface IAppProps extends AppProps {
  Component: NextPageWithLayout;
}
export default function App({ Component, pageProps }: IAppProps) {
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page);
  return (
    <Provider store={store}>
      {getLayout(<Component {...pageProps} />)}
      <Script src="../path/to/flowbite/dist/flowbite.js"></Script>
    </Provider>
  );
}
