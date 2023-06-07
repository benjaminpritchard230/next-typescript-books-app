import Layout from "@/components/Layout";
import { store } from "@/store/store";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { Lora } from "next/font/google";
import type { ReactElement, ReactNode } from "react";
import { Provider } from "react-redux";
import "../styles/globals.css";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const lora = Lora({ subsets: ["latin"] });

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

  return (
    <main className={lora.className}>
      <Provider store={store}>
        {getLayout(<Component {...pageProps} />)}
      </Provider>
    </main>
  );
}
