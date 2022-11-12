import { useRouter } from "next/router";
import type { FC } from "react";
import React, { useContext } from "react";
import Footer from "./footer";
import HeaderNavbar from "./header-navbar";
import NavbarAdmin from "./navbar-admin";

type BaseLayoutProps = {
  children: JSX.Element;
};

const Layout: FC<BaseLayoutProps> = ({ children }) => {
  const router = useRouter();
  const route = router.route.split("/");
  return (
    <div>
      {route[1] == "admin" ? <NavbarAdmin /> : <HeaderNavbar />}
      {route[1] == "admin" ? (
        <div className="ml-[300px]">{children}</div>
      ) : (
        <div className="">{children}</div>
      )}

      {route[1] == "admin" ? <></> : <Footer />}
    </div>
  );
};

export default Layout;
