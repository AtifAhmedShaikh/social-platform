import React from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Navbar />
      <Sidebar />
      <div className="overflow-x-hidden overflow-y-scroll absolute right-0 w-[75%] h-screen">
      {children}
      </div>
    </React.Fragment>
  );
};
export default Layout;
