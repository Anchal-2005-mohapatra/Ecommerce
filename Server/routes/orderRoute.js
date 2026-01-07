const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.post("/create", orderController.createOrder);
router.get("/user/:userId", orderController.getUserOrders);
router.get("/:orderId", orderController.getOrderById);
router.put("/:orderId/status", orderController.updateOrderStatus);
router.put("/:orderId/cancel", orderController.cancelOrder);

module.exports = router;
