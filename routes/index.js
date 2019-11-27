var express = require('express');
var router = express.Router();

const Lyricist = require('lyricist');

router.get('/*', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

module.exports = router;
