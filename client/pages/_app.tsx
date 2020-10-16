import { AppProps } from "next/app";
import * as React from "react";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
      <Component {...pageProps} />
  );
};

export default App;