var express = require('express');
var router = express.Router();

var flash = require('connect-flash');
// Require controller modules.
var quote_controller = require('../controllers/quoteController');
var client_controller = require('../controllers/clientController');

var User = require('../models/user');

// var requestTime = function (req, res, next) {
//   req.requestTime = Date.now()
//   next()
// }


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


// router.use(requestTime);

router.get('/reqQuote', function(req, res, next) {
  res.render('reqQuote', { title: 'Request Quote' });
});


//POST request for creating Quote.
router.post('/reqQuote/create', quote_controller.quote_create_post);

//Pull client information
router.get('/clientInfo', client_controller.client_detail);

//Update client information
//router.post('/clientInfo/update/:id', client_controller.client_update_post);


// router.post('/clientInfo/update/:id', function(req, res){
//   //Update client information
//     let client = {};
//     client.fullname = req.body.full_name;
//     client.address = req.body.address;
//     client.city = req.body.city;
//     client.zip_code = req.body.zip_code;
//     client.phone = req.body.phone;
//     client.email = req.body.email;
  
//     let query = {_id:req.params.id}
  
//     Client.update(query, client, function(err){
//       if(err){
//         console.log(err);
//         return;
//       } else {
//         req.flash('success', 'Client Updated');
//         res.redirect('/reqQuote');
//       }
//   });
//   });


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


// function ensureAuthenticated(req, res, next){
//     if(req.isAuthenticated()){
//       return next();
//     } else {
//       req.flash('danger', 'Please login');
//       res.redirect('/users/login');
//     }
//   }


module.exports = router;