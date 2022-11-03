import type { FC } from "react";
import React, { useContext } from "react";
import Footer from "./footer";
import HeaderNavbar from "./header-navbar";

type BaseLayoutProps = {
  children: JSX.Element;
};

const Layout: FC<BaseLayoutProps> = ({ children }) => {
  //   const { sidebarToggle } = useContext(SidebarContext);
  return (
    <div>
      <HeaderNavbar />
      <div className="">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
