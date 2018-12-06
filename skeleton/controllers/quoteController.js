// var Quote = require('../models/quote');
// const { body, validationResult } = require('express-validator/check');
// const { sanitizeBody } = require('express-validator/filter');

// var async = require('async');

// var quotes = []

// function quoteCreate(gallonsRequested, requestDate, deliveryDate, deliveryAddress, deliveryCity, deliveryState, deliveryZipCode, deliveryContactName,
//     deliveryContactPhone, deliveryContactEmail, suggestedPrice, totalAmountDue, cb) {
//     quotedetail = { 
//       gallonsRequested:gallonsRequested, 
//       requestDate:requestDate, 
//       deliveryDate:deliveryDate, 
//       deliveryAddress:deliveryAddress, 
//       deliveryCity:deliveryCity, 
//       deliveryState:deliveryState, 
//       deliveryZipCode:deliveryZipCode, 
//       deliveryContactName:deliveryContactName,
//       deliveryContactPhone:deliveryContactPhone, 
//       deliveryContactEmail:deliveryContactEmail, 
//       suggestedPrice:suggestedPrice, 
//       totalAmountDue:totalAmountDue
//     }
      
//     var quote = new Quote(quotedetail);    
//     quote.save(function (err) {
//       if (err) {
//         cb(err, null)
//         return
//       }
//       console.log('New Quote: ' + quote);
//       quotes.push(quote)
//       cb(null, quote)
//     }  );
//   }


// // // Display Quote create form on GET.
// // exports.quote_create_get = function(req, res) {
// //     res.send('NOT IMPLEMENTED: Quote create GET');
// // };

// // Display Quote create form on GET.
// exports.quote_create_get = function(req, res, next) {       
//   res.render('quote_form', { title: 'Create Quote'});
// };


// // Handle Quote create on POST.
// exports.quote_create_post = [

//   // Validate fields.
//   body('contactName').isLength({ min: 1 }).trim().withMessage('Delivery Contact name must be specified.')
//       .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
//   body('deliveryDate').isLength({ min: 1 }).trim().withMessage('Family name must be specified.')
//       .isAlphanumeric().withMessage('Family name has non-alphanumeric characters.'),
//   body('requestDate', 'Invalid date of request').optional({ checkFalsy: true }).isISO8601(),
//   body('deliveryDate', 'Invalid date of death').optional({ checkFalsy: true }).isISO8601(),

//   // Sanitize fields.
//   sanitizeBody('contactName').trim().escape(),
//   sanitizeBody('deliveryDate').trim().escape(),
//   sanitizeBody('requestDate').toDate(),
//   sanitizeBody('deliveryDate').toDate(),

//   // Process request after validation and sanitization.
//   (req, res, next) => {

//       // Extract the validation errors from a request.
//       const errors = validationResult(req);

//       if (!errors.isEmpty()) {
//           // There are errors. Render form again with sanitized values/errors messages.
//           res.render('author_form', { title: 'Create Author', author: req.body, errors: errors.array() });
//           return;
//       }
//       else {
//           // Data from form is valid.

//           // Create an Author object with escaped and trimmed data.
//           var author = new Author(
//               {
//                   requestDate: req.body.requestDate,
//                   deliveryDate: req.body.deliveryDate,
//                   requestDate: req.body.requestDate,
//                   deliveryDate: req.body.deliveryDate
//               });
//           author.save(function (err) {
//               if (err) { return next(err); }
//               // Successful - redirect to new author record.
//               res.redirect(author.url);
//           });
//       }
//   }
// ];



// // Handle Quote create on POST.
// exports.quote_create_post = function(req, res) {
//     quoteCreate('2018-11-01','2018-11-02', 'Raj Singh', '123 main', 'Austin', 'TX', '78738', '333-333-4444', 'fake@gmail.com', 10, 2, 20);
//     res.send('IMPLEMENTED: Quote create POST');
// };

// // Display list of all Quotes.
// exports.quoteHist = function(req, res, next) {
//     Quote.find()
//       .sort([['deliveryDate', 'descending']])
//       .exec(function (err, list_quotes) {
//         if (err) { return next(err); }
//         //Successful, so render
//         res.render('quoteHist', { title: 'Quote History', quoteHist: list_quotes });
//       });
//   };

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
var Quote = require('../models/quote');

var async = require('async');


exports.index = function(req, res) {   
    
    async.parallel({
        quote_count: function(callback) {
            Quote.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
        }
    }, function(err, results) {
        res.render('Quote', { title: 'Quote History', error: err, data: results });
    });
};

exports.quote_list = function(req, res, next) {

  Quote.find({}, 'requestDate deliveryDate gallonsRequested totalAmountDue')
    .exec(function (err, list_quotes) {
      if (err) { return next(err); }
      //Successful, so render
      res.render('quoteHist', { title: 'Quote History', quote_list: list_quotes });
    });
};

exports.quote_create_get = function(req, res, next) {     
    res.render('reqQuote', { title: 'Create Quote' });
  };

// Handle Quote create on POST.
exports.quote_create_post = [

    // Validate fields.
    body('gallonsRequested').isNumeric().withMessage('Gallons must be in numbers'),
    // body('requestDate', 'Invalid Request Date').optional({ checkFalsy: true }).isISO8601(),
    body('deliveryDate', 'Invalid Delivery Date').optional({ checkFalsy: true }).isISO8601(),
    body('deliveryAddress').isLength({ min: 1 }).withMessage('Invalid address').trim(),
    body('deliveryCity').isLength({ min: 1 }).withMessage('Invalid City').trim(),
    body('deliveryState'),
    body('deliveryZipCode').isNumeric().withMessage('Must only include numbers'),
    body('deliveryContactName').isLength({min: 2}).withMessage('Please enter your full name'),
    body('deliveryContactPhone').isNumeric().withMessage('Only include Numbers for Phone'),
    body('deliveryContactEmail').isEmail().withMessage('Invalid Email'),

    // Sanitize fields.
    sanitizeBody('requestDate').toDate(),
    sanitizeBody('deliveryDate').toDate(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('reqQuote', { title: 'Create Author', author: req.body, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid.

            // Create a Quote object with escaped and trimmed data.
            var quote = new Quote(
                {
                    gallonsRequested: req.body.gallonsRequested,
                    requestDate: req.body.requestDate,
                    deliveryDate: req.body.deliveryDate,
                    deliveryAddress: req.body.deliveryAddress,
                    deliveryCity: req.body.deliveryCity,
                    deliveryState: req.body.deliveryState,
                    deliveryZipCode: req.body.deliveryZipCode,
                    deliveryContactName: req.body.deliveryContactName,
                    deliveryContactPhone: req.body.deliveryContactPhone,
                    deliveryContactEmail: req.body.deliveryContactEmail,
                    suggestedPrice: req.body.suggestedPrice,
                    totalAmountDue: req.body.totalAmountDue
                });
            quote.save(function (err) {
                if (err) { return next(err); }
                // Successful - redirect to new author record.
                res.redirect('/quoteHist');
            });
        }
    }
];