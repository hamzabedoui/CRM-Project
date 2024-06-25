import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchServices,
  createService,
  deleteService,
  updateService,
} from "../../../redux/features/servicesSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import "./Dashboard.css"; // Import CSS file for Dashboard styles

const Dashboard = () => {
  const dispatch = useDispatch();
  const { services, loading, error } = useSelector((state) => state.services);

  const [newService, setNewService] = useState({
    name: "",
    amount: "",
    category: "",
    unit: "",
  });

  const [editService, setEditService] = useState(null);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editService) {
      setEditService({
        ...editService,
        [name]: value,
      });
    } else {
      setNewService({
        ...newService,
        [name]: value,
      });
    }
  };

  const handleAddService = () => {
    dispatch(createService(newService));
    setNewService({
      name: "",
      amount: "",
      category: "",
      unit: "",
    });
  };

  const handleEdit = (service) => {
    setEditService(service);
  };

  const handleUpdateService = () => {
    dispatch(
      updateService({
        serviceId: editService._id,
        updatedService: {
          name: editService.name,
          amount: editService.amount,
          category: editService.category,
          unit: editService.unit,
        },
      })
    );
    setEditService(null);
  };

  const handleDelete = (serviceId) => {
    dispatch(deleteService(serviceId));
  };

  if (loading) {
    return (
      <div className="loading-container">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="service-list-container">
      <h2>Service List</h2>
      <TableContainer component={Paper}>
        <Table className="service-table" aria-label="service table">
          <TableHead>
            <TableRow>
              <TableCell className="table-header">Name</TableCell>
              <TableCell className="table-header">Amount</TableCell>
              <TableCell className="table-header">Category</TableCell>
              <TableCell className="table-header">Unit</TableCell>
              <TableCell className="table-header">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service._id}>
                <TableCell>
                  {editService && editService._id === service._id ? (
                    <TextField
                      name="name"
                      value={editService.name}
                      onChange={handleInputChange}
                      className="edit-input"
                    />
                  ) : (
                    service.name
                  )}
                </TableCell>
                <TableCell>
                  {editService && editService._id === service._id ? (
                    <TextField
                      name="amount"
                      value={editService.amount}
                      onChange={handleInputChange}
                      className="edit-input"
                    />
                  ) : (
                    service.amount
                  )}
                </TableCell>
                <TableCell>
                  {editService && editService._id === service._id ? (
                    <TextField
                      name="category"
                      value={editService.category}
                      onChange={handleInputChange}
                      className="edit-input"
                    />
                  ) : (
                    service.category
                  )}
                </TableCell>
                <TableCell>
                  {editService && editService._id === service._id ? (
                    <TextField
                      name="unit"
                      value={editService.unit}
                      onChange={handleInputChange}
                      className="edit-input"
                    />
                  ) : (
                    service.unit
                  )}
                </TableCell>
                <TableCell className="buttons-action">
                  {editService && editService._id === service._id ? (
                    <button
                      variant="contained"
                      onClick={handleUpdateService}
                      className="action-button"
                    >
                      Update
                    </button>
                  ) : (
                    <button
                      variant="contained"
                      onClick={() => handleEdit(service)}
                      className="action-button"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    variant="contained"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(service._id)}
                    className="action-button delete-button"
                  >
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="add-service-container">
        <TextField
          label="Name"
          name="name"
          value={newService.name}
          onChange={handleInputChange}
          className="add-input"
        />
        <TextField
          label="Amount"
          name="amount"
          value={newService.amount}
          onChange={handleInputChange}
          className="add-input"
        />
        <TextField
          label="Category"
          name="category"
          value={newService.category}
          onChange={handleInputChange}
          className="add-input"
        />
        <TextField
          label="Unit"
          name="unit"
          value={newService.unit}
          onChange={handleInputChange}
          className="add-input"
        />
        <button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddService}
          className="action-button add-button"
        >
          Add Service
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
