var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var clientSchema = new Schema(
  {
    full_name: {type: String, required: true, max: 255},
    address: {type: String, required: true, max: 255},
    city: {type: String, max: 100},
    state: {type: String, max: 2},
    zip_code: {type: Number},
    phone: {type: Number},
    email: {type: String, max: 200}
  }
);

//Export model
module.exports = mongoose.model('Client', clientSchema);