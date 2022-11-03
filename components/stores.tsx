import { ReactElement } from "react";
import Layout from "../layouts";

function Stores() {
  return <h1>Stores</h1>;
}

Stores.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
export default Stores;
