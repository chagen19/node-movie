var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var favoriteSchema = new Schema({
    source: String, 
    id: String, 
    title: String, 
    release_date: String, 
    poster_path: String
});
var profileSchema = new Schema({
    id: Number, 
    username: String, 
    favorites: [favoriteSchema]
});

profileSchema.statics.findById = function (id, cb) {
  this.findOne({ id: id }, cb);
}

module.exports = mongoose.model('profiles', profileSchema);