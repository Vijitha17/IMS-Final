const express = require('express');
const router = express.Router();
const { addItem, getItems } = require('../controllers/itemController');

router.post('/', addItem);
router.get('/', getItems);

module.exports = router;
