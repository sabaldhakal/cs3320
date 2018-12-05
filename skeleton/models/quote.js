var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var QuoteSchema = new Schema(
  {
    gallons: {type: Number, required: true},
    // requestDate: {type: String, required: true},
    deliveryDate: {type: String, required: true},
    deliveryAddress: {type: String, required: true, max: 100},
    deliveryCity: {type: String, max: 100},
    deliveryState: {type: String, max: 2},
    deliveryZipCode: {type: String, max: 5},
    contactName: {type: String, required: true},
    deliveryContactPhone: {type: String, required: true},
    deliveryContactEmail: {type: String, required: true}
    // price: {type: Number, required: true},
    // total: {type: Number, required: true}
  }
);

// Virtual for quote's URL
QuoteSchema
.virtual('url')
.get(function () {
  return '/catalog/quoteHist/' + this.clientId;
});

//Export model
module.exports = mongoose.model('Quote', QuoteSchema);