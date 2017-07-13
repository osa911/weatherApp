// # Frontend routes
var express   = require('express'),
  get         = require('../api/get'),
  router      = express.Router(),
  adminRoutes;

adminRoutes = () => {
  router.get('/api/weather', get);
  router.get('/api/find', get);
  router.get('/api/group', get);

  return router;
};

module.exports = adminRoutes;
