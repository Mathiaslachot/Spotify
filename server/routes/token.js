/** @format */

var express = require('express');
var router = express.Router();
const {paramToken} = require('../config/passport-setup');
/* GET searchArtist listing. */

router.get('/', function(req, res, next) {
  console.log({paramToken});
  res.send({paramToken});
});

module.exports = router;
