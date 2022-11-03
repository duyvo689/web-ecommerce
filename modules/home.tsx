import { ReactElement } from "react";
import HomeExhibition from "../components/home-exhibition";
import Layout from "../layouts";

function Home() {
  return (
    <>
      <HomeExhibition />
    </>
  );
}

Home.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
export default Home;
