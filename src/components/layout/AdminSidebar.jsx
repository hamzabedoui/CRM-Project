import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { List, ListItem, ListItemText, Avatar, ListItemIcon } from "@mui/material";
import { useDispatch } from "react-redux";
import { Home, People, AttachMoney, ShoppingCart, Payment, AccountCircle } from "@mui/icons-material";
import { signOutUser } from "../../redux/features/loginSlice";
import "./Sidebar.css";

const AdminSidebar = ({ userName, userAvatar, isOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      console.log("Attempting to sign out...");
      await dispatch(signOutUser());
      console.log("Sign out successful, navigating to home...");
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className={`SidebarContainer ${isOpen ? 'open' : 'closed'}`}>
      <div className="container">
        <div className="UserInfoContainer">
          <Avatar alt={userName} src={userAvatar} className="UserAvatar" />
          <div className="UserName">{userName}</div>
        </div>
        <List component="nav">
          <div className="nav-side">
            <ListItem button component={Link} to="/main-responsable/home">
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText className="item" primary="Home" />
            </ListItem>
            <ListItem button component={Link} to="/main-responsable/customers">
              <ListItemIcon>
                <People />
              </ListItemIcon>
              <ListItemText className="item" primary="Customers" />
            </ListItem>
            <ListItem button component={Link} to="/main-responsable/sales">
              <ListItemIcon>
                <ShoppingCart />
              </ListItemIcon>
              <ListItemText className="item" primary="Sales" />
            </ListItem>
            <ListItem button component={Link} to="/main-responsable/services">
              <ListItemIcon>
                <AttachMoney />
              </ListItemIcon>
              <ListItemText className="item" primary="Services" />
            </ListItem>
            <ListItem button component={Link} to="/main-responsable/payments">
              <ListItemIcon>
                <Payment />
              </ListItemIcon>
              <ListItemText className="item" primary="Payments" />
            </ListItem>
            <ListItem button component={Link} to="/main-responsable/profile">
              <ListItemIcon>
                <AccountCircle />
              </ListItemIcon>
              <ListItemText className="item" primary="Profile" />
            </ListItem>
          </div>
        </List>
        <div className="btncontainer">
          <button className="btn" fullWidth variant="outlined" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
