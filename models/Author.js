const mongoose = require('mongoose');
const AuthorSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    bio: {
      type: String,
      required: true
    },
    birthdate: {
      type: Date,
      required: true
    },
    image: {
      type: String,
      default: null
    },
    video: {
      type: String,
      default: ''
    },
    dateAdded: {
      type: Date,
      default: Date.now
    }
  });
  
  module.exports = mongoose.model('Author', AuthorSchema);