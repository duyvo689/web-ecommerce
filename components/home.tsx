import { ReactElement } from "react";
import Layout from "../layouts";

function Home() {
  return <h1>Home</h1>;
}

Home.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
export default Home;
