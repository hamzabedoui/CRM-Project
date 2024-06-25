import React from 'react'
import AdminSidebar from '../layout/AdminSidebar'
import {
  Outlet,
  useNavigate
} from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect } from 'react';
import "../../components/responsable/MainResponsable.css"

const MainResponsable = () => {
  const navigate = useNavigate()
  useEffect(() => {
    !Cookies.get("token") && navigate("/");
  }, []);

  return (
    <div className="mainResponsable">
      <AdminSidebar />
      <div className="main-container">
        <Outlet />
      </div>
    </div>
  )
}

export default MainResponsable