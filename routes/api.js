var express = require('express');
var router = express.Router();

const Lyricist = require('lyricist');

//Get song lyrics from a Genius song ID
//Expects the genius token query param as `genius_token`
router.get('/lyrics/:songId', (req, res) => {

  if(!req.query.genius_token){
    res.status(400)
    return res.send('Missing client token')
  }


  const lyricist = new Lyricist(req.query.genius_token)
  lyricist.song(req.params.songId, {fetchLyrics: true})
    .then(song =>{
      return res.send(song.lyrics)
    })
    .catch(err => {
      res.status(400)
      return res.send('{"error":"something went wrong"}')
    })
  

})

module.exports = router;
