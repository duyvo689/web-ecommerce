import { ReactElement } from "react";
import Layout from "../layouts";

function Home() {
  return (
    <>
    </>
  )
}

Home.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
export default Home