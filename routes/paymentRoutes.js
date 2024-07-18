const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentContoller");

router.post("/post", paymentController.createPayment);
router.delete("/delete/:id", paymentController.deletePayment);

router.get("/get", paymentController.getPayments);

router.get("/:id", paymentController.getPaymentById);

module.exports = router;
