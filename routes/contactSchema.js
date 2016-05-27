var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    card_id: {type: String, unique: true}, 
    name: String,
    phone: Number,
    birthday: Date,
    description: String,
  }, {collection: "user"}
);
exports.userSchema = userSchema;