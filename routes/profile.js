var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var profileService = require('../services/profileService.js')
/* GET profile */
router.get('/:id', function(req, res) {
    profileService.retrieveProfileById(req.params.id, function(err, data) {
    	console.log("CHADS: " + data)
    	res.send(data);
    });
});
router.post('/:username', function(req, res) {
    profileService.createProfile(req.params.username, function(err, data) {
    	res.send(data);
    });
});
router.put('/:id', function(req, res) {
	console.log("Adding to favorites" + req.body.source);
	var body = req.body;
	var param = req.params;
    profileService.addFavorite(param.id, body.source, body.id, body.title,  body.release_date, body.poster_path, function(err, data) {
    	res.send(data);
    });
});
router.delete('/:id/favorite/:favId', function(req, res) {
    console.log("Deleting from favorites");
    profileService.removeFavorite(req.params.id, req.params.favId, function(err, data) {
        res.send(data);
    });
});
module.exports = router;
