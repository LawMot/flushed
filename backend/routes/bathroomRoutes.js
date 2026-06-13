const express = require('express');
const router = express.Router();
const { getBathroomProfile } = require('../controllers/bathroomController');

router.get('/:id', getBathroomProfile);

module.exports = router;