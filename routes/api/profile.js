const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');

const db = require('../../pg');
const config = require('../../config');




function verifyCookiesToken(req, res, next) {
  if (!req.cookies.token) return res.status(401).send("Authorized token is required.");
  
  jwt.verify(req.cookies.token, config.secret, (err, decoded) => {
    if (err) return res.status(401).send("Unauthorized token.");

    req.userId = decoded.id;
    next();
  });
}

function verifyHeadersToken(req, res, next) {

  if (!req.token) return res.status(401).send("Authorized token is required.");
  
  jwt.verify(req.token, config.secret, (err, decoded) => {
    if (err) return res.status(401).send("Unauthorized token.");

    req.userId = decoded.id;
    next();
  });
}

// Use verifyCookiesToken middleware for cookie token
router.get('/', verifyHeadersToken, (req, res) => {

    const query = {
      text: "SELECT name, email FROM users WHERE id=$1",
      values: [req.userId]
    };

    db.query(query, (err, qres) => {
      if (err) return res.status(500).send("There was an error selecting user.");
      res.status(200).json(qres.rows[0]);
    });
  });


module.exports = router;