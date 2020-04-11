const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Child schema
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

// Parent schema
const ShoppingListSchema = new Schema({
  listName: {
    type: String,
    required: true,
  },
  userID: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  items: [ItemSchema],
});

module.exports = ShoppingList = mongoose.model('list', ShoppingListSchema);
