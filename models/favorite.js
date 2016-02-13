var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var favoriteSchema = new Schema({
    source: String, 
    id: Number, 
    title: String, 
    release_date: String, 
    poster_path: String,
    profiles: [{
    	type: Schema.ObjectId,
    	ref: 'profiles'
    }]
});
favoriteSchema.statics.addFavorite = function (profileOId, movie, cb) {
    var oid = mongoose.Types.ObjectId(profileOId);
    console.log("Profile " + profileOId + ":" + movie.source + ":" + movie.id + ":" + movie.release_date + ":" + movie.poster_path )
    return this.collection.findAndModify({ source: movie.source, id: movie.id, title: movie.title, release_date: movie.release_date, poster_path: movie.poster_path }, [], { $addToSet: { profiles: oid }}, {upsert: true, new: true}, cb);
};

favoriteSchema.statics.removeFavorite = function (profileOid, favOid, cb) {
    profileOid = mongoose.Types.ObjectId(profileOid);
    favOid = mongoose.Types.ObjectId(favOid);
    this.collection.update({ _id: favOid }, {$pull: {profiles: profileOid}}, cb);
}

module.exports = mongoose.model('favorites', favoriteSchema);