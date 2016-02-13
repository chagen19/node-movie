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
	addFavorite : function(profileOId, movie, cb) {
		console.log("Adding favorite: " + movie.title);
		Favorite.addFavorite(profileOId, movie, function(err, data) {
			if (err) throw err;
			 Profile.addFavorite(profileOId, data._id, callback(cb));
		});
	},
	isFavorite : function(profileOId, movieId, cb) {
		console.log("Checking if movie " + movieId + " is a favorite for profile " + profileOId);
		Profile.findByOId(profileOId, function(err, data) {
			console.log("Data is " + data);
			if (err) throw err;
			var favs = data ? data.favorites : [];
			for (var i = 0, len = favs.length; i < len; i++) {
				console.log("checking");
				if(favs[i].id == movieId) {
					console.log("Yes it's true");
					cb(err, true);
					return;
				}
			}
			cb(err, false);
			return;
		});
	},
	removeFavorite : function(profileOId, favOId, cb) {
		console.log("Removing Favorite: " + favOId);
		Profile.removeFavorite(profileOId, favOId, function(err, data) {
			if (err) throw err;
			console.log("Removed form profile");
			Favorite.removeFavorite(profileOId, favOId, callback(cb));
		});
		
	}
}