import React from 'react'
import AdminSidebar from '../../components/layout/AdminSidebar'
import {
  Outlet,
  useNavigate
} from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect } from 'react';
import "./MainResponsable.css"
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../redux/features/loginSlice';


const MainResponsable = () => {
  const userInfos = useSelector((store) => store.login.userInfos)
  const dispatch = useDispatch()
  console.log(userInfos.name);
  const navigate = useNavigate()
  useEffect(() => {
    !Cookies.get("token") && navigate("/");
    dispatch(getUserDetails())
  }, []);

  return (
    <div className="mainResponsable">
      <AdminSidebar userName={userInfos?.name}/>
      <div className="main-container">
        <Outlet />
      </div>
    </div>
  )
}

export default MainResponsable