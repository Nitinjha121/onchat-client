import React from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";

//config
import "config/axios";

//recoil
import { RecoilRoot } from "recoil";

//context provider
import { GlobalContextProvider, SocketProvider } from "components/contexts";

//components
import { ToastAlerts } from "components/ui";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <SocketProvider>
        <GlobalContextProvider>
          <ToastAlerts />
          <Component {...pageProps} />
        </GlobalContextProvider>
      </SocketProvider>
    </RecoilRoot>
  );
}

export default MyApp;
