// routes/responseRoutes.js
const express = require('express');
const { getResponses, submitResponse } = require('../controllers/responseController');
const { protect, admin } = require('../middlewares/authMiddleware');

const responseRoutes = express.Router();

responseRoutes.route('/')
  .get(protect, admin, getResponses)  // Admin route to get all responses
  .post(submitResponse);
 // Public route to submit responses
 responseRoutes.get('/download-csv', protect, admin, exportResponsesAsCSV);
module.exports = responseRoutes;

