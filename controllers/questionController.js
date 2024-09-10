 // controllers/questionController.js
const Question = require('../models/questionModel');

// @desc    Get all questions
// @route   GET /api/questions
// @access  Public
exports.getQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Add a new question
// @route   POST /api/questions
// @access  Admin
exports.addQuestion = async (req, res) => {
  const { question, options } = req.body;

  try {
    const newQuestion = new Question({ question, options });
    await newQuestion.save();
    res.status(201).json(newQuestion);
    console.log('added new questions')
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a question
// @route   DELETE /api/questions/:id
// @access  Admin
exports.deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    await Question.findByIdAndDelete(req.params.id);
    res.json({ message: 'Question removed' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update a question
// @route   PUT /api/questions/:id
// @access  Admin
exports.updateQuestion = async (req, res) => {
  const { question, options } = req.body;

  try {
    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.id,
      { question, options },
      { new: true }
    );

    if (!updatedQuestion) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.json(updatedQuestion);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
 