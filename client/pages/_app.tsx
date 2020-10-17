import { AppContext, AppProps } from "next/app";
import * as React from "react";
import "../styles/App.css";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default App;
