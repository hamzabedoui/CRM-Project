import React from "react";
import ClientSidebar from "../layout/ClientSidebar";
import { Outlet } from "react-router-dom"; 
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MainClient = () => {
  const navigate = useNavigate()
  
  useEffect(() => {
    !Cookies.get("token") && navigate("/");
  }, []);

  return (
    <div className="mainResponsable">
      <ClientSidebar />
      <div className="main-container">
        <Outlet />
      </div>
    </div>
  );
};

export default MainClient;
