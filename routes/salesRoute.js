const express = require('express');
const router = express.Router();
const { createSale, getSales, getSaleById, updateSale, deleteSale } = require('../controllers/saleController');
const { protect } = require('../middleware/authMiddleware');


router.post('/post', protect, createSale);
router.get('/get',protect, getSales);
router.get('/get/:id',protect, getSaleById);
router.put('/update/:id',protect, updateSale);
router.delete('/delete/:id',protect, deleteSale);

module.exports = router;
