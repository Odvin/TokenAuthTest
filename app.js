'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cookiePaeser = require('cookie-parser');
const bearerToken = require('express-bearer-token');

const apiRoutes = require('./routes/api');

const app = express();

app.use(bearerToken());
app.use(bodyParser.json());
app.use(cookiePaeser());

apiRoutes(app);

app.get('*', (req, res) => {
  res.sendStatus(404);
});

const port = 5000;
app.listen(port);

module.exports = app;
