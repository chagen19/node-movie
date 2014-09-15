var mongoose = require('mongoose');
var models = require('../models');
var Profile = models.Profile;
var Favorite = models.Favorite;
var Counter = models.Counter;

var callback = function(cb){
        return function(err, data){
            if (err){
                console.error.bind(console, 'db error:');
                return;
            }
            cb(err, data);
        }
    }
module.exports = {
	retrieveProfileById : function(id, cb) {
		console.log("Requesting profile for id " + id);
		Profile.findById(id, callback(cb));
			
	},
	createProfile : function(username, cb) {
		console.log("Saving profile");
		Counter.increment('userid', function (err, data) {
		  if (err) throw err;
		  profile = new Profile({id: data.seq, username: username, favorites: []})
		  profile.save(callback(cb));
		});
		
	},
	addFavorite : function(profileId, fav, cb) {
		console.log("Adding favorite: " + fav.title);
		Favorite.addFavorite(profileId, fav, function(err, data) {
			if (err) throw err;
			 Profile.addFavorite(profileId, data._id, callback(cb));	
		});
	},
	removeFavorite : function(profileId, favId, cb) {
		console.log("Removing Favorite: " + favId);
		Profile.removeFavorite(profileId, favId, function(err, data) {
			if (err) throw err;
			console.log("REmoved form prodile");
			Favorite.removeFavorite(profileId, favId, callback(cb));
		});
		
	}
}