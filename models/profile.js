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

profileSchema.statics.findByOId = function (profileOid, cb) {
    profileOid = mongoose.Types.ObjectId(profileOid);
    this.findOne({ _id: profileOid }).populate('favorites').exec(cb);
}
profileSchema.statics.addFavorite = function (profileOid, favOId, cb) {
	profileOid = mongoose.Types.ObjectId(profileOid);
	favOid = mongoose.Types.ObjectId(favOId);
    this.collection.update({ _id: profileOid}, { $addToSet: { favorites:  favOid}}, cb);
}

profileSchema.statics.removeFavorite = function (profileOid, favOId, cb) {
	profileOid = mongoose.Types.ObjectId(profileOid);
	favOid = mongoose.Types.ObjectId(favOId);
 	this.collection.update({ _id: profileOid }, {$pull: {favorites: favOid}}, cb);
}

module.exports = mongoose.model('profiles', profileSchema);