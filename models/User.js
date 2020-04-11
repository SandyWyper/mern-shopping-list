const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const Item = require('./Item');

// Create Item schema
const ItemSchema = new Schema({
  item: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  registered_date: {
    type: Date,
    default: Date.now,
  },
  items: [ItemSchema],
});

module.exports = User = mongoose.model('user', UserSchema);
