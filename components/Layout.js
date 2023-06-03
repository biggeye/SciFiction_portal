import Head from "next/head";


const Layout = ({ children }) => {
  return (
    <div>
      <Head>
        <title>promo.SciFiction.com</title>
        <meta name="SciFiction Promotions and Giveaways" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="icon" href="/bigeye_100.png" />
      </Head>

        <main>{children}</main>

    </div>
  );
};

export default Layout;
