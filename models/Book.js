const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  isbn: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  genre: {
    type: String,
    trim: true
  },
  availableCount: {
    type: Number,
    default: 1,
    min: 0
  },
  totalCount: {
    type: Number,
    default: 1,
    min: 0
  },
  popularity: { 
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
