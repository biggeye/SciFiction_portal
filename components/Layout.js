import Head from "next/head";
import { Providers } from "./providers";


const Layout = ({ children }) => {
  return (
    <div>
      <Head>
        <title>aEye.World</title>
        <meta
          name="description"
          content="aEye.World"/>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="icon" href="/bigeye_100.png" />
      </Head>
      <Providers>

        <main>{children}</main>

      </Providers>
    </div>
  );
};

export default Layout;
