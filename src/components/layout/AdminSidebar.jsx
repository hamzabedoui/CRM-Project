import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { List, ListItem, ListItemText, Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import "./Sidebar.css";

const AdminSidebar = ({ userName, userAvatar }) => {
  const navigate = useNavigate();
  const userInfos = useSelector((store) => store.login.userInfos);
  const handleSignOut = () => {
    console.log("Sign out");
    navigate('/');
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
            <ListItem button  component={Link} to="/main-responsable/home">
              <ListItemText className="item" primary="Home" />
            </ListItem>
            <ListItem button component={Link} to="/main-responsable/customers">
              <ListItemText className="item" primary="Customers" />
            </ListItem>
            <ListItem button component={Link} to="/main-responsable/sales">
              <ListItemText className="item" primary="Sales" />
            </ListItem>
            <ListItem button component={Link} to="/main-responsable/services">
              <ListItemText className="item" primary="Services" />
            </ListItem>
            <ListItem button component={Link} to="/main-responsable/payments">
              <ListItemText className="item" primary="Payments" />
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
