// src/components/Layout.jsx
import React from "react";
import Header from "./Header"; // adjust path if needed
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet /> {/* This renders the nested routes */}
      </main>
    </>
  );
};

export default Layout;
