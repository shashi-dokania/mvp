var List = require('./listModel.js');
var Q = require('q');

module.exports = {

  getList: function (request, response, next) {
    var findAll = Q.nbind(List.find, List);

    findAll({})
    .then(function (list) {
      response.json(list);
    })
    .fail(function (error) {
      next(error);
    });
  },

  postList: function (request, response, next) {
    var address = request.body.address;
    var city = request.body.city;
    var state = request.body.state;
    var zip = request.body.zip;
    var startDate = request.body.startDate;
    var endDate = request.body.endDate;
    var price = request.body.price;

    console.log("data....", address, city, state, zip, startDate, endDate, price);
    var create;
    var newPost;

    create = Q.nbind(List.create, List);
    newPost = {
      address: address,
      city: city,
      state: state,
      zip: zip,
      startDate: startDate,
      endDate: endDate,
      price: price
    };
     return create(newPost);
  }

};
