var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var quoteSchema = new Schema(
  {
    //client: {type: Schema.Types.ObjectID, ref: 'Client', required: true},
    gallonsRequested: {type: Number},
    requestDate: {type: Date},
    deliveryDate: {type: Date},
    deliveryAddress: {type: String, max: 255},
    deliveryCity: {type: String, max: 100},
    deliveryState: {type: String, max: 2},
    deliveryZipCode: {type: Number},
    deliveryContactName: {type: String, max: 255},
    deliveryContactPhone: {type: Number},
    deliveryContactEmail: {type: String, max: 255},
    suggestedPrice: {type: Number},
    totalAmountDue: {type: Number}
  }
);

/*// Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function () {
  return this.family_name + ', ' + this.first_name;
});

// Virtual for author's lifespan
AuthorSchema
.virtual('lifespan')
.get(function () {
  return (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString();
});

// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});
*/

//Export model
module.exports = mongoose.model('Quote', quoteSchema);