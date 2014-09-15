var mongoose = require('mongoose');
var models = require('../models');
var Profile = models.Profile;
var Counter = models.Counter;

var callback = function(cb){
        return function(err, data){
            if (err){
                console.log('An error has occured');
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
		  console.log("OK")
		  profile.save(callback(cb));
		});
		
	},
	addFavorite : function(id, source, favId, title, releasedt, posterpath, cb) {
		console.log("Adding favorite: " + title);
		Profile.findById(id, function(err, profile) {
			 if (err){
                console.log('An error has occured');
                return;
            }
            profile.favorites.push({source: source, id: favId, title: title, release_date: releasedt, poster_path: posterpath});
			profile.save(callback(cb));
		});
	},
	removeFavorite : function(id, favId, cb) {
		console.log("Removing Favorite: " + favId);
		Profile.removeFavorite(id, favId, callback(cb));
	}
}