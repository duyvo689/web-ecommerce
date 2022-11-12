import React, { ReactElement } from "react";
import Layout from "../../layouts";

function Admin() {
  return <h1>duyvo</h1>;
}

Admin.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Admin;
