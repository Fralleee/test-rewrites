import "@/styles/globals.css";
import type { AppContext, AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

App.getInitialProps = async ({ ctx }: AppContext) => {
  console.log(ctx);
  return {};
};
