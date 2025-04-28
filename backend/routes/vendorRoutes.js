const express = require('express');
const router = express.Router();
const { addVendor, getVendors } = require('../controllers/vendorController');

router.post('/', addVendor);
router.get('/', getVendors);

module.exports = router;
