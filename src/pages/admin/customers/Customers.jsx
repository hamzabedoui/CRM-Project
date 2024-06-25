import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  deleteUser,
  updateUserStatus,
  createClient,
} from "../../../redux/features/clientSlice"; // Correct import path
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import "./Customers.css"; // Import CSS for styling

const Customers = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);

  const [open, setOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    workingAddress: "",
    phoneNumber: "",
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleClickOpen = (userId) => {
    setUserIdToDelete(userId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setUserIdToDelete(null);
  };

  const handleDelete = () => {
    dispatch(deleteUser(userIdToDelete));
    handleClose();
  };

  const handleStatusToggle = (userId, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    dispatch(updateUserStatus({ userId, status: newStatus }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(createClient(newUser));
      if (createClient.fulfilled.match(result)) {
        setNewUser({
          name: "",
          email: "",
          password: "",
          workingAddress: "",
          phoneNumber: "",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.msg || error}</div>;
  }

  return (
    <div className="user-list-container">
      <h2>User List</h2>

      <form onSubmit={handleRegister} className="create-user-form">
        <TextField
          label="Name"
          name="name"
          value={newUser.name}
          onChange={handleInputChange}
          required
        />
        <TextField
          label="Email"
          name="email"
          value={newUser.email}
          onChange={handleInputChange}
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={newUser.password}
          onChange={handleInputChange}
          required
        />
        <TextField
          label="Working Address"
          name="workingAddress"
          value={newUser.workingAddress}
          onChange={handleInputChange}
          required
        />
        <TextField
          label="Phone Number"
          name="phoneNumber"
          value={newUser.phoneNumber}
          onChange={handleInputChange}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Add User
        </Button>
      </form>

      <TableContainer component={Paper}>
        <Table className="user-table" aria-label="user table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Working Address</TableCell>
              <TableCell>Phone Number</TableCell>
              {/* <TableCell>Status</TableCell> */}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.workingAddress}</TableCell>
                <TableCell>{user.phoneNumber}</TableCell>
                {/* <TableCell>
                  <IconButton
                    className={`status-icon ${user.status === "inactive" ? "active" : ""}`}
                    onClick={() => handleStatusToggle(user._id, user.status)}
                  >
                    {user.status === "active" ? (
                      <CheckCircleIcon />
                    ) : (
                      <RadioButtonUncheckedIcon />
                    )}
                  </IconButton>
                </TableCell> */}
                <TableCell>
                  <Button
                    variant="contained"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleClickOpen(user._id)}
                    className="user-table-button"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Customers;
