import type { FC } from "react";
import React, { useContext } from "react";
import HeaderNavbar from "./header-navbar";

type BaseLayoutProps = {
  children: JSX.Element;
};

const Layout: FC<BaseLayoutProps> = ({ children }) => {
//   const { sidebarToggle } = useContext(SidebarContext);
  return (
    <div className="mb-40">
      <HeaderNavbar />
      </div>
  );
};

export default Layout;
