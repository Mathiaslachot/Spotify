/** @format */

var express = require('express');
var router = express.Router();
const {paramToken} = require('../config/passport-setup');
const fetch = require('node-fetch');
/* GET searchArtist listing. */

router.get('/', function(req, res, next) {
  const idAlbum = req.query.id;
  const url = 'https://api.spotify.com/v1/albums/' + idAlbum + '/tracks?access_token=' + paramToken.token;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      res.send(data.items);
    })
    .catch(err => {});
});

module.exports = router;
