
// controllers/responseController.js
const Response = require('../models/responseModel');
const mongoose = require('mongoose');
const { Parser } = require('json2csv');

// @desc    Get all responses
// @route   GET /api/responses
// @access  Admin
exports.getResponses = async (req, res) => {
  try {
    const responses = await Response.find().populate('answers.questionId');
    res.json(responses);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.submitResponse = async (req, res) => {
  try {
    console.log(req.body)
    const { answers } = req.body;

    // Validate that answers is an array and not empty
    if (!answers || !Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({ message: 'Answers are required' });
    }

    // Ensure each answer has a valid questionId and selectedOption
    const formattedAnswers = answers.map((answer) => ({
      questionId: answer.questionId, // Ensure this is a valid ObjectId
      selectedOption: answer.selectedOption,
    }));

    const newResponse = new Response({
      answers: formattedAnswers,  // Pass the answers array
      submissionId: new mongoose.Types.ObjectId(), // Create a unique submission ID
      createdAt: new Date(), // Capture the current date/time
    });

    await newResponse.save(); // Save to the database

    res.status(201).json({ message: 'Response saved successfully', newResponse });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server Error', error });
  }
};

// @desc    Export responses as CSV
// @route   GET /api/responses/download-csv
// @access  Admin
exports.exportResponsesAsCSV = async (req, res) => {
  try {
    const responses = await Response.find().populate('answers.questionId');

    // Define fields for the CSV
    const fields = ['_id', 'answers.questionId.question', 'answers.selectedOption', 'createdAt'];
    const opts = { fields };

    const parser = new Parser(opts);
    const csv = parser.parse(responses);

    // Set headers for downloading CSV
    res.header('Content-Type', 'text/csv');
    res.attachment('responses.csv');
    return res.send(csv);
  } catch (error) {
    res.status(500).json({ message: 'Error exporting responses' });
  }
};
