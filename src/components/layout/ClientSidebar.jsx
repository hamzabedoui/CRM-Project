import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { List, ListItem, ListItemText, Avatar, Button } from "@mui/material";
import "./Sidebar.css";

const ClientSidebar = ({ userName, userAvatar }) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    console.log("Sign out");
    navigate("/login");
  };

  return (
    <div className="SidebarContainer">
      <div className="container">
        <div className="UserInfoContainer">
          <Avatar alt={userName} src={userAvatar} className="UserAvatar" />
          <div className="UserName">{userName}</div>
        </div>
        <List component="nav">
          <div className="nav-side">
            <ListItem button component={Link} to="/client/dashboard">
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button component={Link} to="/client/services">
              <ListItemText primary="Services" />
            </ListItem>
            <ListItem button component={Link} to="/client/applications">
              <ListItemText primary="My Applications" />
            </ListItem>
            <ListItem button component={Link} to="/client/profile">
              <ListItemText primary="profile" />
            </ListItem>
            <ListItem button component={Link} to="/client/feedback">
              <ListItemText primary="Feedback" />
            </ListItem>
          </div>
        </List>
      </div>
      <Button fullWidth variant="outlined" onClick={handleSignOut}>
        Sign Out
      </Button>
    </div>
  );
};

export default ClientSidebar;
