#! /usr/bin/env node

console.log('This script populates some client\'s and quoteHistory');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb://')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}

var async = require('async')
//var Client = require('./models/client')
var Quote = require('./models/quote')



var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

//var clients = []
var quotes = []

// function clientCreate(first_name, family_name, address, city, state, zip_code, phone, email, cb) {
//   clientdetail = {first_name:first_name , family_name: family_name, address: address }
//   if (city != false) clientdetail.city = city
//   if (state != false) clientdetail.state = state
//   if (zip_code != false) clientdetail.zip_code = zip_code
//   if (phone != false) clientdetail.phone = phone
//   if (email != false) clientdetail.email = email


//   var client = new Client(clientdetail);
       
//   client.save(function (err) {
//     if (err) {
//       cb(err, null)
//       return
//     }
//     console.log('New Client: ' + client);
//     clients.push(client)
//     cb(null, client)
//   }  );
// }

function quoteCreate(requestDate, deliveryDate, client, deliveryAddress, deliveryCity, deliveryState, deliveryZipcode, gallons, price, total, cb) {
  quotedetail = { 
    requestDate: requestDate,
    deliveryDate: deliveryDate,
    client: client,
    deliveryAddress: deliveryAddress,
    deliveryCity: deliveryCity,
    deliveryState: deliveryState,
    deliveryZipcode: deliveryZipcode,
    gallons: gallons,
    price: price,
    total: total
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


// function createClient(cb) {
//     async.parallel([
//         function(callback) {
//             clientCreate('Raj','Singh', '123 main', 'Austin', 'TX', '78738', '1231114444', 'raj@gmail.com',  callback);
//         },
//         function(callback) {
//             clientCreate('Daniel','Le', '345 main', 'Austin', 'TX', '78738', '1231144444', 'dan@gmail.com',  callback);
//         },
//         function(callback) {
//             clientCreate('Sabal','Dhakal', '567 main', 'Austin', 'TX', '78738', '1234114444', 'sabal@gmail.com',  callback);
//         }
//         ],
//         // optional callback
//         cb);
// }


function createQuotes(cb) {
    async.parallel([
        function(callback) {
            quoteCreate('2018-11-01','2018-11-02', 'Raj Singh', '123 main', 'Austin', 'TX', '78738', 10, 2, 20,  callback);
        },
        function(callback) {
            quoteCreate('2018-10-05','2018-10-06', 'Raj Singh', '345 main', 'Austin', 'TX', '78738', 100, 2, 200,  callback);
        },
        function(callback) {
            quoteCreate('2018-11-01','2018-11-02', 'Raj Singh', '567 main', 'Austin', 'TX', '78738', 1000, 2, 2000,  callback);
        }
        ],
        // optional callback
        cb);
}



async.series([
    createQuotes
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('Quotes: '+quotes);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});



