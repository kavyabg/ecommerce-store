const express = require('express');
const { createOrder, getOrdersByEmail } = require('../controllers/orderController');

const router = express.Router();

router.post('/', createOrder);
router.get('/:email', getOrdersByEmail);
// router.get('/', getAllOrders);
// router.get('/:id', getOrderById);

module.exports = router;
