const express = require('express');
const router = express.Router();

// User logout
router.get('/', (req, res) => {
  res.clearCookie('token').send("User is logout.");
});

module.exports = router;