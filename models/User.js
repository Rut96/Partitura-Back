const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const {createHashedPassword} = require('../services/user-utils');
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  role: { type: String, required: true, default: 'user' },
  favoriteSongs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Song'
  }],
  progress: {
    type: Number,
    default: 0
  },
  avatarImage: {
    type: String,
    default: ''
  },
  accessToken: {
    type: String,
    default: ''
  },
  refreshToken: {
    type: String,
    default: ''
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre('save', async function(next) {
  try { 
    const passwordHash = createHashedPassword(this.password);
    this.password = passwordHash;
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.isValidPassword = async function(password) {
  try {
    return this.password == createHashedPassword(password);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = mongoose.model('User', UserSchema);
