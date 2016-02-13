var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var profileService = require('../services/profileService.js')
/* GET profile */
router.get('/:id', function(req, res) {
    profileService.retrieveProfileById(req.params.id, function(err, data) {
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
	var fav = req.body;
    profileService.addFavorite(req.params.id, fav, function(err, data) {
    	res.status(200).send();
    });
});
router.get('/:id/favorite/:movieId', function(req, res) {
    var movieId = Number(req.params.movieId);
    profileService.isFavorite(req.params.id, movieId, function(err, data) {
        res.status(200).send({isFavorite: data});
    });
});
router.delete('/:id/favorite/:favOId', function(req, res) {
    console.log("Deleting from favorites");
    profileService.removeFavorite(req.params.id, req.params.favOId, function(err, data) {
        res.status(200).end();
    });
});
module.exports = router;
