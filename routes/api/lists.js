// TODO: insert 'auth' to private routes

const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const auth = require('../../middleware/auth');

// Item Model Route
const List = require('../../models/ShoppingList');

// @route     GET api/lists
// @desc      Get all shopping lists
// @access    Private
router.get('/', (req, res) => {
  List.find({ userID: req.body.userID })
    .then((items) => res.json(items))
    .catch((err) => {
      console.log(err);
    });
});

// @route     POST api/lists/new
// @desc      Create a new shopping list
// @access    Private
router.post('/new', (req, res) => {
  const newList = new List({
    listName: req.body.listName,
    userID: req.body.userID,
  });

  newList
    .save()
    .then((list) => res.json(list))
    .catch((err) => {
      console.log(err);
      res.status(404).json({ success: false });
    });
});

// @route     POST api/lists
// @desc      Create a new item entry
// @access    Private
router.post('/', (req, res) => {
  List.findById(req.body.listID).then((list) => {
    list.items.push({ item: req.body.item });
    list
      .save()
      .then(() => res.json({ success: true }))
      .catch((err) => {
        console.log(err);
        res.status(404).json({ success: false });
      });
  });
});

// @route     POST api/lists/delete/list
// @desc      Delete a list
// @access    Private
router.delete('/delete/list', (req, res) => {
  List.deleteOne({ _id: req.body.listID })
    .then(() => res.json({ success: true }))
    .catch((err) => {
      console.log(err);
      res.status(404).json({ success: false });
    });
});

// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);

// @route     POST api/lists/delete
// @desc      Delete an item
// @access    Private
router.post('/delete/item', (req, res) => {
  List.findOneAndUpdate(
    { _id: req.body.listID },
    { $pull: { items: { _id: req.body.itemID } } }
  )
    .then(() => res.json({ success: true }))
    .catch((err) => {
      console.log(err);
      res.status(404).json({ success: false });
    });
});
// NOTE: is this the correct header type for this operation?  More of an update than a delete operation.

module.exports = router;
