var Client = require('../models/clientInfo');

var async = require('async');

exports.index = function(req, res) {   
    
    async.parallel({
        client_count: function(callback) {
            Client.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
        }
    }, function(err, results) {
        res.render('Client', { title: 'Client Information', error: err, data: results });
    });
};

exports.client_detail = function(req, res, next) {

  Client.find()
    .exec(function (err, list_clients) {
      if (err) { return next(err); }
      //Successful, so render
      res.render('clientInfo', { title: 'Client Information', client_list: list_clients });
    });

};