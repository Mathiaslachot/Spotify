/** @format */

var express = require('express');
var router = express.Router();
const {paramToken} = require('../config/passport-setup');
const fetch = require('node-fetch');

router.get('/', function(req, res, next) {
  const idArtiste = req.query.id;

  const url = 'https://api.spotify.com/v1/artists/' + idArtiste + '/albums?access_token=' + paramToken.token;

  fetch(url)
    .then(res => res.json())

    .then(data => {
      res.send(data.items);
    })
    .catch(err => {});
});

module.exports = router;
