import React, { ReactNode } from "react";
import Footer from "./shared/Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      {children}
      <Footer />
    </>
  );
};

export default Layout;
