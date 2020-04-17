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
  List.find(req.body.userID)
    .then((lists) => res.json(lists))
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
      .then((list) => res.json(list))
      .catch((err) => {
        console.log(err);
        res.status(404).json({ success: false });
      });
  });
});

// @route     DELETE api/lists/delete/list
// @desc      Delete a list
// @access    Private
router.delete('/delete/list/:id', (req, res) => {
  List.deleteOne({ _id: req.params.id })
    .then((list) => res.json(list))
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

module.exports = router;
