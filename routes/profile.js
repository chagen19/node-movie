var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var profileService = require('../services/profileService.js')
/* GET profile */
router.get('/:id', function(req, res) {
    profileService.retrieveProfileById(req.params.id, res, function(err, data) {
    	console.log("CHADS: " + data)
    	res.send(data);
    });
});
router.post('/:username', function(req, res) {
    profileService.createProfile(req.params.username, res, function(err, data) {
    	res.send(data);
    });
});
router.post('/fav/:id', function(req, res) {
	console.log("Adding to favorites" + req.body.source);
	var body = req.body;
	var param = req.params;
    profileService.addFavorite(param.id, body.source, body.id, body.title,  body.release_date, body.poster_path, res, function(err, data) {
    	res.send(data);
    });
});
module.exports = router;
