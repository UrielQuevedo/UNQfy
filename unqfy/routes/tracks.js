const { Router } = require('express');
const connection = require('../connection');
const router = Router();

router.post('/', (connection.executeFunction(['albumId','name','duration','genres'],(unqfy, req, res) => {
  const data = req.body;
  const track = unqfy.addTrack(data.albumId,{name:data.name, duration:data.duration, genres:data.genres});
  unqfy.sendInfoToLog({ message: 'Se agrego el track ' + track.name, levelMessage: 'info'});
  res.status(201).json(track);
})));

router.get('/:id/lyrics', (connection.executeFunction([],(unqfy, req, res) => {
  const { id } = req.params;
  const track = unqfy.getTrackById(parseInt(id));
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