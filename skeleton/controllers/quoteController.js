var Quote = require('../models/quote');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

var async = require('async');

var quotes = []

function quoteCreate(gallons, deliveryDate, deliveryAddress, deliveryCity, deliveryState, deliveryZipcode, contactName, deliveryContactPhone, deliveryContactEmail) {
    quotedetail = { 
    //  requestDate: requestDate,
      gallons: gallons,
      deliveryDate: deliveryDate,
      deliveryAddress: deliveryAddress,
      deliveryCity: deliveryCity,
      deliveryState: deliveryState,
      deliveryZipCode: deliveryZipcode,
      contactName: contactName,
      deliveryContactPhone: deliveryContactPhone,
      deliveryContactEmail: deliveryContactEmail
      // price: price,
      // total: total
    }
      
    var quote = new Quote(quotedetail);    
    quote.save(function (err) {
      if (err) {
        cb(err, null)
        return
      }
      console.log('New Quote: ' + quote);
      quotes.push(quote)
      cb(null, quote)
    }  );
  }


// // Display Quote create form on GET.
// exports.quote_create_get = function(req, res) {
//     res.send('NOT IMPLEMENTED: Quote create GET');
// };

// Display Quote create form on GET.
exports.quote_create_get = function(req, res, next) {       
  res.render('quote_form', { title: 'Create Quote'});
};


// Handle Quote create on POST.
exports.quote_create_post = [

  // Validate fields.
  body('contactName').isLength({ min: 1 }).trim().withMessage('Delivery Contact name must be specified.')
      .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
  body('deliveryDate').isLength({ min: 1 }).trim().withMessage('Family name must be specified.')
      .isAlphanumeric().withMessage('Family name has non-alphanumeric characters.'),
  body('requestDate', 'Invalid date of request').optional({ checkFalsy: true }).isISO8601(),
  body('deliveryDate', 'Invalid date of death').optional({ checkFalsy: true }).isISO8601(),

  // Sanitize fields.
  sanitizeBody('contactName').trim().escape(),
  sanitizeBody('deliveryDate').trim().escape(),
  sanitizeBody('requestDate').toDate(),
  sanitizeBody('deliveryDate').toDate(),

  // Process request after validation and sanitization.
  (req, res, next) => {

      // Extract the validation errors from a request.
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
          // There are errors. Render form again with sanitized values/errors messages.
          res.render('author_form', { title: 'Create Author', author: req.body, errors: errors.array() });
          return;
      }
      else {
          // Data from form is valid.

          // Create an Author object with escaped and trimmed data.
          var author = new Author(
              {
                  requestDate: req.body.requestDate,
                  deliveryDate: req.body.deliveryDate,
                  requestDate: req.body.requestDate,
                  deliveryDate: req.body.deliveryDate
              });
          author.save(function (err) {
              if (err) { return next(err); }
              // Successful - redirect to new author record.
              res.redirect(author.url);
          });
      }
  }
];



// Handle Quote create on POST.
exports.quote_create_post = function(req, res) {
    quoteCreate('2018-11-01','2018-11-02', 'Raj Singh', '123 main', 'Austin', 'TX', '78738', '333-333-4444', 'fake@gmail.com', 10, 2, 20);
    res.send('IMPLEMENTED: Quote create POST');
};

// Display list of all Quotes.
exports.quoteHist = function(req, res, next) {
    Quote.find()
      .sort([['deliveryDate', 'descending']])
      .exec(function (err, list_quotes) {
        if (err) { return next(err); }
        //Successful, so render
        res.render('quoteHist', { title: 'Quote History', quoteHist: list_quotes });
      });
  };

// exports.index = function(req, res) {   
//     async.parallel({
//         quoteCreate: function() {
//             Quote.quoteCreate({}, callback); // Pass an empty object as match condition to find all documents of this collection
//         },
//         client_count: function(callback) {
//             Client.countDocuments({}, callback);
//         }
//     }, function(err, results) {
//         res.render('index', { title: 'Fuel Quote Home', error: err, data: results });
//     });
// };

// exports.index = function(req, res, next) {
//     res.render('index', { title: 'Fuel Quote Home' });
//    //res.send('NOT IMPLEMENTED: Site Home Page'); 
//    next();
//    }

// // Display list of all Quote.
// exports.quoteHist = function(req, res, next) {

//     Quote.find({}, 'title client')
//       .populate('client')
//       .exec(function (err, quoteHist) {
//         if (err) { return next(err); }
//         //Successful, so render
//         res.render('quoteHist', { title: 'Quote History', quoteHist: quoteHist });
//       });    
//   };

// // Display Quote page for a specific Quote.
// exports.quote_detail = function(req, res) {
//     res.send('NOT IMPLEMENTED: Quote detail: ' + req.params.id);
// };

// // Display Quote create form on GET.
// exports.quote_create_get = function(req, res) {
//     res.send('NOT IMPLEMENTED: Quote create GET');
// };

// // Handle Quote create on POST.
// exports.quote_create_post = function(req, res) {
//     res.send('NOT IMPLEMENTED: Quote create POST');
    


// };

// // Display quote delete form on GET.
// exports.quote_delete_get = function(req, res) {
//     res.send('NOT IMPLEMENTED: Quote delete GET');
// };

// // Handle quote delete on POST.
// exports.quote_delete_post = function(req, res) {
//     res.send('NOT IMPLEMENTED: Quote delete POST');
// };

// // Display quote update form on GET.
// exports.quote_update_get = function(req, res) {
//     res.send('NOT IMPLEMENTED: Quote update GET');
// };

// // Handle quote update on POST.
// exports.quote_update_post = function(req, res) {
//     res.send('NOT IMPLEMENTED: Quote update POST');
// };