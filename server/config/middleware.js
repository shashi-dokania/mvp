var morgan = require('morgan');
var bodyParser = require('body-parser');
var user = require('../user/userRoutes.js');
var list = require('../list/listRoutes.js');
var posts = require('../posts/postRoutes.js');

module.exports = function (app, express) {

  var userRouter = express.Router();
  var listingRouter = express.Router();
  // var postingRouter = express.Router();

  app.use(morgan('dev'));
  //json and url parser
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client'));
  // creating routers for each page
  app.use('/api/user', userRouter);
  app.use('/api/listing', listingRouter);
  // app.use('/api/posting', postingRouter);

  //logging error
  app.use(function (error, request, response, next) {
    console.error(error.stack);
    next(error);
  });
  //to send error to the client
  app.use(function (error, request, response, next) {
    response.status(500).send({ error: error.message });
  });

  user(userRouter);
  list(listingRouter);
  // posts(postingRouter);
};
