import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { List, ListItem, ListItemText, Avatar, Button } from "@mui/material";
import { useSelector } from "react-redux";
import "./Sidebar.css"

const AdminSidebar = ({ userName, userAvatar }) => {
  const navigate = useNavigate();
  const userInfos = useSelector((store) => store.login.userInfos);
  const handleSignOut = () => {
    console.log("Sign out");
    navigate("/login");
  };

  return (
    <div className="SidebarContainer">
      <div className="container">
        <div className="UserInfoContainer">
          <Avatar alt={userName} src={userAvatar} className="UserAvatar" />
          <div className="UserName">{userInfos.name}</div>
        </div>
        <List component="nav">
          <div className="nav-side">
            <ListItem button component={Link} to="/main-responsable/dashboard">
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button component={Link} to="/main-responsable/customers">
              <ListItemText primary="Users" />
            </ListItem>
            <ListItem button component={Link} to="/admin/confirm-application">
              <ListItemText primary="Requests" />
            </ListItem>
            <ListItem button component={Link} to="/admin/feedbacks">
              <ListItemText primary="Feedback" />
            </ListItem>
          </div>
        </List>
      </div>
      <div className="btncontainer">
        <button className="btn" fullWidth variant="outlined" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
