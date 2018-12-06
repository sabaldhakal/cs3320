var express = require('express');
var router = express.Router();

var flash = require('connect-flash');
// Require controller modules.
var quote_controller = require('../controllers/quoteController');
var client_controller = require('../controllers/clientController');

var User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Fuel Quote', success: req.session.success, errors: req.session.errors });
    req.session.errors = null;
  });

// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Fuel Prediction' });
// });

//Get list of quote history
router.get('/quoteHist', quote_controller.quote_list);

router.get('/reqQuote', function(req, res, next) {
  res.render('reqQuote', { title: 'Request Quote' });
});

//POST request for creating Quote.
router.post('/reqQuote/create', quote_controller.quote_create_post);

//Pull client information
router.get('/clientInfo', client_controller.client_detail);

router.get('/register', function(req, res){
  res.render('register', { title: 'Fuel Quote' });
});


  
router.post('/submit', function(req, res, next) {
    req.check('email', 'Invalid email address').isEmail();
    req.check('password', 'Password is invalid').isLength({min: 4}).equals(req.body.confirmPassword);
  
    var errors = req.validationErrors();
    if (errors) {
      req.session.errors = errors;
      req.session.success = false;
      res.redirect('/');
    } else {
      req.session.success = true;
      req.flash('success', 'User Logged In');
      res.redirect('/clientInfo');
    }
});





// router.post('/reqQuote/create', function(req, res){

//     quoteCreate( 
//         {requestDate: requestDate},
//         {deliveryDate: deliveryDate},
//         {client: client},
//         {deliveryAddress: deliveryAddress},
//         {deliveryCity: deliveryCity},
//         {deliveryState: deliveryState},
//         {deliveryZipcode: deliveryZipcode},
//         {deliveryContactPhone: deliveryContactPhone},
//         {deliveryContactEmail: deliveryContactEmail},
//         {gallons: gallons},
//         {price: price},
//         {total: total}
//     )
//     console.log('Adding a quote to QuoteHistory');
//     res.render('quoteHistory', { title: 'Fuel Quote' });
// });




// // GET request for creating a Quote. NOTE This must come before routes that display Quote (uses id).
// router.get('/quote/create', quote_controller.quote_create_get);



// // GET request to delete Quote.
// router.get('/quote/:id/delete', quote_controller.quote_delete_get);

// // POST request to delete Quote.
// router.post('/quote/:id/delete', quote_controller.quote_delete_post);

// // GET request to update Quote.
// router.get('/quote/:id/update', quote_controller.quote_update_get);

// // POST request to update Quote.
// router.post('/quote/:id/update', quote_controller.quote_update_post);

// // GET request for one Quote.
// router.get('/quote/:id', quote_controller.quote_detail);

// // GET request for list of all Quote items.
// router.get('/quote', quote_controller.quote_list);

// CLIENT ROUTES //

// // GET request for creating client. NOTE This must come before route for id (i.e. display client).
// router.get('/client/create', client_controller.client_create_get);

// // POST request for creating client.
// router.post('/client/create', client_controller.client_create_post);

// // GET request to delete client.
// router.get('/client/:id/delete', client_controller.client_delete_get);

// // POST request to delete client.
// router.post('/client/:id/delete', client_controller.client_delete_post);

// // GET request to update client.
// router.get('/client/:id/update', client_controller.client_update_get);

// // POST request to update client.
// router.post('/client/:id/update', client_controller.client_update_post);

// // GET request for one client.
// router.get('/client/:id', client_controller.client_detail);

// // GET request for list of all clients.
// router.get('/client', client_controller.client_list);

function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
      return next();
    } else {
      req.flash('danger', 'Please login');
      res.redirect('/users/login');
    }
  }


module.exports = router;