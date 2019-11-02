const { Router } = require('express');
const connection = require('../connection');
const router = Router();

router.post('/', (connection.executeFunction(['albumId','name','duration','genres'],(unqfy, req, res) => {
  const data = req.body;
  try {
    const track = unqfy.addTrack(data.albumId,{name:data.name, duration:data.duration, genres:data.genres});
    res.status(201).json(track);
  }
  catch(error) {
    res.status(404).json({status:404, errorCode:'RELATED_RESOURCE_NOT_FOUND', message: error.message });
  }
})));

router.get('/:id/lyrics', (connection.executeFunction([],(unqfy, req, res) => {
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
})));  

module.exports = router;