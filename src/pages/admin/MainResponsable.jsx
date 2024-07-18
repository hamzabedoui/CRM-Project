import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/layout/AdminSidebar';
import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../redux/features/loginSlice';
import MenuIcon from '@mui/icons-material/Menu';

import "./MainResponsable.css";

const MainResponsable = () => {
  const userInfos = useSelector((store) => store.login.userInfos);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (!Cookies.get("token")) navigate("/");
    dispatch(getUserDetails());
  }, [dispatch, navigate]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 500) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    // Check the initial window size
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="mainResponsable">
      <button className="menu-button" onClick={toggleSidebar}>
        {sidebarOpen ? <MenuIcon /> : <MenuIcon />}
      </button>
      <AdminSidebar userName={userInfos?.name} userAvatar={userInfos?.avatar} isOpen={sidebarOpen} />
      <div className={`main-container ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default MainResponsable;
