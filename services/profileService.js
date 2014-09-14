var mongoose = require('mongoose');
var models = require('../models');
var Profile = models.Profile;
var Counter = models.Counter;

var callback = function(res, cb){
        return function(err, data){
            if (err){
                console.log('An error has occured');
                return;
            }
            cb(err, data);
        }
    }
module.exports = {
	retrieveProfileById : function(id, res, cb) {
		console.log("Requesting profile for id " + id);
		Profile.findById(id, callback(res, cb));
	},
	createProfile : function(username, res, cb) {
		console.log("Saving profile");
		Counter.increment('userid', function (err, data) {
		  if (err) throw err;
		  profile = new Profile({id: data.seq, username: username, favorites: []})
		  console.log("OK")
		  profile.save(callback(res, cb));
		});
		
	},
	addFavorite : function(id, source, favId, title, releasedt, posterpath, res, cb) {
		console.log("Favorite ID is: " + favId);
		Profile.findById(id, function(err, profile) {
			 if (err){
                console.log('An error has occured');
                return;
            }
            profile.favorites.push({source: source, id: favId, title: title, release_date: releasedt, poster_path: posterpath});
			profile.save(callback(res, cb));
		});
		
	}
}