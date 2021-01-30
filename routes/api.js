var express = require("express");
var router = express.Router();

const Lyricist = require("lyricist");

const { getLyrics } = require("genius-lyrics-api");

//Get song lyrics from a Genius song ID
//Expects the genius token query param as `genius_token`
router.get("/lyrics/:songId", async (req, res) => {
  try {
    if (!req.query.genius_token) {
      res.status(400);
      return res.send("Missing client token");
    }

    const lyricist = new Lyricist(req.query.genius_token);

    const song = await lyricist.song(req.params.songId);

    const lyrics = await getLyrics(song.url);

    return res.send(lyrics);
  } catch (err) {
    console.log(err);
    res.status(400);
    return res.send('{"error":"something went wrong"}');
  }
});

module.exports = router;
