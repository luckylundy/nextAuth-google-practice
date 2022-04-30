import { SessionProvider } from "next-auth/react";

//本来のpagePropsにsessionを追加する
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
