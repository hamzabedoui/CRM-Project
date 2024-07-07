import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { List, ListItem, ListItemText, Avatar, ListItemIcon } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { Home, People, AttachMoney, ShoppingCart, Payment } from "@mui/icons-material"; // Import icons
import { signOutUser } from "../../redux/features/loginSlice"; // Import signOutUser action
import "./Sidebar.css";

const AdminSidebar = ({ userName, userAvatar }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize useDispatch hook

  const handleSignOut = async () => {
    try {
      await dispatch(signOutUser());
      navigate('/login'); 
    } catch (error) {
      console.error("Error signing out:", error);
      // Handle error, such as showing an error message
    }
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
