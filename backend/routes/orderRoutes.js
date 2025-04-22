const express = require('express');
const { createOrder } = require('../controllers/orderController');

const router = express.Router();

router.post('/', createOrder);
// router.get('/', getAllOrders);
// router.get('/:id', getOrderById);

module.exports = router;
