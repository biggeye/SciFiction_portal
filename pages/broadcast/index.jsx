import Layout from "/components/Layout";
import Navbar from "/components/Navbar";
import LiveStream from "/components/creators/did/LiveStream";

export default async function Broadcast() {

    return(
        <Layout>
            <Navbar />
              <LiveStream />
        </Layout>
    )
}