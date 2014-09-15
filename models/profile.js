var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var profileSchema = new Schema({
    id: Number, 
    username: String,
    favorites: [{
    	type: Schema.ObjectId,
    	ref: 'favorites'
    }]
});

profileSchema.statics.findById = function (id, cb) {
  this.findOne({ id: id }).populate('favorites').exec(cb);
}
profileSchema.statics.addFavorite = function (profileId, favId, cb) {
	var profileOid = mongoose.Types.ObjectId(profileId);
	var favOid = mongoose.Types.ObjectId(favId);
    return this.collection.update({ _id: profileOid}, { $addToSet: { favorites:  favOid}}, cb);
}

profileSchema.statics.removeFavorite = function (profileId, favId, cb) {
	var profileOid = mongoose.Types.ObjectId(profileId);
	var favOid = mongoose.Types.ObjectId(favId);
 	this.collection.update({ _id: profileOid }, {$pull: {favorites: favOid}}, cb);
}

module.exports = mongoose.model('profiles', profileSchema);