const Service = require('../models/service');

// Get all services
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new service
const createService = async (req, res) => {
  const { name, amount, category, unit } = req.body;
  const service = new Service({ name, amount, category, unit });
  try {
    const newService = await service.save();
    res.status(201).json(newService);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a service
const deleteService = async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id);
    if (!deletedService) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json({ message: 'Service deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a service
const updateService = async (req, res) => {
  const { name, amount, category, unit } = req.body;
  const { id } = req.params;

  try {
    const updatedService = await Service.findByIdAndUpdate(
      id,
      { name, amount, category, unit },
      { new: true } // Return updated document
    );

    if (!updatedService) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json(updatedService);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getAllServices,
  createService,
  deleteService,
  updateService,
};
