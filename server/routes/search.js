/** @format */

var express = require('express');
var router = express.Router();
const {paramToken} = require('../config/passport-setup');
const fetch = require('node-fetch');

router.get('/', function(req, res, next) {
  const nameArtiste = req.query.name;
  const url = 'https://api.spotify.com/v1/search?q=' + nameArtiste + '&type=artist&access_token=' + paramToken.token;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      res.send(data.artists.items);
    })
    .catch(err => {});
});

module.exports = router;
