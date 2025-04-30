import React, { useEffect } from "react";
import Header from "../Components/Header";
import { Navigate, Outlet } from "react-router-dom";
import Footer from "../Components/Footer";
import { useSelector } from "react-redux";
import SignUp from "../Containers/SignUp";
import Login from "../Containers/Login";

const Layout = () => {
  

  return (
    <main>
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
};

export default Layout;
