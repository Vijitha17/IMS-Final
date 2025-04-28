const express = require('express');
const router = express.Router();
const { addStock, getStocks } = require('../controllers/stockController');

router.post('/', addStock);
router.get('/', getStocks);

module.exports = router;
