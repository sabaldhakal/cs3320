const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
var Quote = require('../models/quote');
var async = require('async');
var moment = require('moment');

var suggestedPrice = 2.29;

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

    Quote.requestDate = moment().format('L');
    Quote.deliveryDate= moment().format('L');
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
    // sanitizeBody('requestDate').toDate(),
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
            var requestTime= function (req, res, next) {
                req.requestTime = Date.now()
                next()
              };
            
            var requestDate = req.requestTime;
            var suggestedPrice = 2.29;
            var totalAmountDue = req.body.gallonsRequested*suggestedPrice;
            
            // Create a Quote object with escaped and trimmed data.
            var quote = new Quote(
                {
                    gallonsRequested: req.body.gallonsRequested,
                    requestDate: requestDate,
                    deliveryDate: req.body.deliveryDate,
                    deliveryAddress: req.body.deliveryAddress,
                    deliveryCity: req.body.deliveryCity,
                    deliveryState: req.body.deliveryState,
                    deliveryZipCode: req.body.deliveryZipCode,
                    deliveryContactName: req.body.deliveryContactName,
                    deliveryContactPhone: req.body.deliveryContactPhone,
                    deliveryContactEmail: req.body.deliveryContactEmail,
                    suggestedPrice: suggestedPrice,
                    totalAmountDue: totalAmountDue
                });
            quote.save(function (err) {
                if (err) { return next(err); }
                // Successful - redirect to new author record.
                res.redirect('/quoteHist');
            });
        }
    }
];