// models/responseModel.js
const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  answers: [
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true,
      },
      selectedOption: {
        type: String,
        required: true,
      },
    },
  ],
  submissionId: {
    type: mongoose.Schema.Types.ObjectId, // Unique identifier for each submission
    default: mongoose.Types.ObjectId,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Capture the date the response was submitted
  },
});

module.exports = mongoose.model('Response', responseSchema);
