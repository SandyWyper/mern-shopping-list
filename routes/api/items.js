const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Model Route
// const Item = require('../../models/Item');
const User = require('../../models/User');

// // @route     GET api/items
// // @desc      Get all items
// // @access    Public
// router.get('/', (req, res) => {
//   Item.find()
//     .sort({ date: -1 })
//     .then((items) => res.json(items));
// });

// // @route     POST api/items
// // @desc      Create a new item entry
// // @access    Private
// router.post('/', auth, (req, res) => {
//   const newItem = new Item({
//     name: req.body.name,
//   });

//   newItem.save().then((item) => res.json(item));
// });

// // @route     DELETE api/items
// // @desc      Delete an item
// // @access    Private
// router.delete('/:id', auth, (req, res) => {
//   Item.findById(req.params.id)
//     .then((item) => item.remove().then(() => res.json({ success: true })))
//     .catch((err) => res.status(404).json({ success: false }));
// });

// module.exports = router;

// TODO: add in auth as a parameter to the relevant api calls

// @route     GET api/items
// @desc      Find all items from a user
// @access    Public
router.get('/', auth, (req, res) => {
  User.findById(req.body.userId, 'items')
    .then((user) => res.json(user.items))
    .catch((err) => res.status(404).json({ success: false }));
});

// @route     POST api/items
// @desc      Create a new item entry
// @access    Private
router.post('/', auth, (req, res) => {
  User.findById(req.body.userId)
    .then((user) => {
      user.items.push({ item: req.body.item });
      user.save().then(() => res.json({ success: true }));
    })
    .catch((err) => res.status(404).json({ success: false }));
});

// @route     DELETE api/items
// @desc      Delete an item
// @access    Private
router.delete('/', auth, (req, res) => {
  User.findById(req.body.userId, 'items')
    .then((user) => {
      user.items = user.items.filter((item) => item._id !== req.body.itemId);
      user.save().then(() => res.json({ success: true }));
    })
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
