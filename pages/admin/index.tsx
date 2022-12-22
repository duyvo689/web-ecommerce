import React, { ReactElement, useEffect } from "react";
import Layout from "../../layouts";
import { useRouter } from "next/router";

function Admin() {
  const router = useRouter();

  useEffect(() => {
    const data = localStorage.getItem("token");

    const route = router.route.split("/")[1];

    if (!data && route == "admin") {
      router.push("/admin/login");
    }
  }, [router]);
  return <h1>duyvo</h1>;
}

Admin.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Admin;
