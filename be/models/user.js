const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User Schema
const { Schema } = mongoose;  // Correctly import Schema from mongoose

const userSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  greenhouse: [{
    type: Schema.Types.ObjectId,
    ref: 'Plant'  // Reference to the Plant model
  }],
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
