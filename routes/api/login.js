const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');

const db = require('../../pg');
const config = require('../../config');


// User login
router.post( '/', (req, res) => {
  if (!req.body.email || !req.body.password) return res.status(400).send("Can't login.");

  const query = {
    text: "SELECT id, name FROM users where email=$1 and password = crypt($2, password)",
    values: [req.body.email, req.body.password]
  };

  db.query(query, (err, qres) => {
    if (err || typeof qres.rows[0] === 'undefined') return res.status(404).send("No user found.");

    const token = jwt.sign({id: qres.rows[0].id}, config.secret, { expiresIn: '2 days' });
    // Cookie is optional
    res.status(200).cookie('token', token).json({token:token});
  });
});


module.exports = router;