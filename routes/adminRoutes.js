const express = require('express');
const { registerAdmin, loginAdmin } = require('../controllers/adminController');
const adminRoutes = express.Router();

adminRoutes.post('/register', registerAdmin);
adminRoutes.post('/login', loginAdmin);

module.exports = adminRoutes;
