const { Router } = require('express');
const connection = require('../connection');
const router = Router();
const unqfy = connection.getUNQfy('database');


router.get('/:id/lyrics', (req, res) => {
  const { id } = req.params;
  const track = unqfy.getTrackById(id);
  track.getLyrics()
    .then((response) => 
    {
      const header = response.message.header;
      const body = response.message.body;
      if (header.status_code !== 200){
        throw new Error('status code != 200');
      }
      const lyrics = body.lyrics.lyrics_body;
      res.status(200).json({ name: track.name, lyrics: lyrics});
    });
});  

module.exports = router;