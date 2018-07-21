const register   = require('./register');
const profile = require('./profile');
const logout = require('./logout');
const login = require('./login');

module.exports = (app) => {
  app.use('/api/register', register);
  app.use('/api/profile', profile);
  app.use('/api/logout', logout);
  app.use('/api/login', login);
};
