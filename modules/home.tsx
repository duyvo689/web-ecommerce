import { ReactElement } from "react";
import HomeCategory from "../components/home-category";
import HomeExhibition from "../components/home-exhibition";
import HomeHeroHeader from "../components/home-hero-header";
import HomeTrendingProduct from "../components/home-trending-product";
import Layout from "../layouts";

function Home() {
  return (
    <>
      <HomeHeroHeader />
      <HomeTrendingProduct />
      <HomeCategory />
      <HomeExhibition />
    </>
  );
}

Home.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
export default Home;
