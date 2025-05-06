// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { getUserByEmail } = require('../controllers/userController');

router.get('/email/:email', getUserByEmail); // clean & explicit
module.exports = router;
