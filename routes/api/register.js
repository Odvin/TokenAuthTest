const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');

const db = require('../../pg');
const config = require('../../config');


function verifyData(req, res, next) {

  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!re.test(String(req.body.email).toLowerCase())) 
    return res.status(400).send("Email isn't specified.");

  if (!req.body.password ) 
    return res.status(400).send("Password isn't specified.");

  if (!req.body.name ) 
    return res.status(400).send("Name isn't specified.");

  // There is no need to do this, because email field in database schema has unique property. We will get error during insertion but for clever response will use it.

  const query = {
    text: "select count(1) from users where email=$1 ",
    values: [req.body.email]
  };

  db.query(query, (err, qres) => {
    if (err) return res.status(500).send("There was an error registering the student.");
    if (+qres.rows[0].count !== 0) return res.status(400).send("The Email is used.");

    next();
  });
}


//  Register new user
router.post('/', verifyData, (req, res) => {

  const query = {
    text: "INSERT INTO users VALUES (default, $3, crypt($2, gen_salt('bf', 8)), $1) RETURNING id",
    values: [req.body.email, req.body.password, req.body.name]
  };

  db.query(query, (err, qres) => {
    if (err) return res.status(500).send("There was an error registering the user.");

    const token = jwt.sign({id: qres.rows[0].id}, config.secret, { expiresIn: '2 days' });

    // we also send token as cookie, it is optional but commonly used. It is possible to send two different tokens, one with cookie and second as bearer, in this way we can validate user permissions for different roles.
    res.status(201).cookie('token', token).json({token: token});
  }); 
});


module.exports = router;