const express = require('express');
const router = express.Router();
const {
  getAllServices,
  createService,
  deleteService,
  updateService,
} = require('../controllers/serviceController');


router.get('/fetchServices', getAllServices);


router.post('/', createService);


router.delete('/:id', deleteService);


router.put('/updateServices/:id', updateService);

module.exports = router;
