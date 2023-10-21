const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    required: true
  },
  lyrics: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: false
  },
  chords: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: null
  },
  songVideo: {
    type: String,
    required: false
  },
  dateAdded: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Song', SongSchema);
