var listController = require('./listController.js');

module.exports = function (app) {

  app.get('/', listController.getList);
  app.post('/', listController.postList);
};
