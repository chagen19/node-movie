var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var favoriteSchema = new Schema({
    source: String, 
    id: String, 
    title: String, 
    release_date: String, 
    poster_path: String,
    profiles: [{
    	type: Schema.ObjectId,
    	ref: 'profiles'
    }]
});

favoriteSchema.statics.addFavorite = function (profileId, fav, cb) {
    var oid = mongoose.Types.ObjectId(profileId);
    console.log("Profile " + profileId + ":" + fav.source + ":" + fav.id + ":" + fav.release_date + ":" + fav.poster_path )
    return this.collection.findAndModify({ source: fav.source, id: fav.id, title: fav.title, release_date: fav.release_date, poster_path: fav.poster_path }, [], { $addToSet: { profiles: oid }}, {upsert: true, new: true}, cb);
};

favoriteSchema.statics.removeFavorite = function (profileId, favId, cb) {
    var profileOid = mongoose.Types.ObjectId(profileId);
    var favOid = mongoose.Types.ObjectId(favId);
    this.collection.update({ _id: favOid }, {$pull: {profiles: profileOid}}, cb);
}

module.exports = mongoose.model('favorites', favoriteSchema);