// routes/questionRoutes.js
const express = require('express');
const {
  getQuestions,
  addQuestion,
  deleteQuestion,
  updateQuestion,
} = require('../controllers/questionController');
const { protect, admin } = require('../middlewares/authMiddleware');

const questionRoutes = express.Router();

questionRoutes.route('/')
  .get(getQuestions)
  .post(protect, admin, addQuestion);

  questionRoutes.route('/:id')
  .delete(protect, admin, deleteQuestion)
  .put(protect, admin, updateQuestion);

module.exports =questionRoutes;
