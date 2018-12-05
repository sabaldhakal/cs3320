// var mongoose = require('mongoose');

// var Schema = mongoose.Schema;

// var ClientSchema = new Schema(
//   {
//     clientId: {type: Number, auto},
//     first_name: {type: String, required: true, max: 100},
//     family_name: {type: String, required: true, max: 100},
//     address: {type: String, required: true, max: 100},
//     city: {type: String, max: 100},
//     state: {type: String, max: 2},
//     zip_code: {type: String, max: 5},
//     phone: {type: String, max: 10},
//     email: {type: String, max: 100}
//   }
// );

// // Virtual for author's full name
// ClientSchema
// .virtual('name')
// .get(function () {
//   return this.family_name + ', ' + this.first_name;
// });

// // Virtual for author's URL
// ClientSchema
// .virtual('url')
// .get(function () {
//   return '/catalog/client/' + this._id;
// });

// //Export model
// module.exports = mongoose.model('Client', ClientSchema);