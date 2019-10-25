const { Router } = require('express');
const router = Router();
const { UNQfy } = require('../unqfy');
const unqfy = new UNQfy();

router.get('/:id/lyrics', (req, res) => {
  const { id } = req.params;
  unqfy.addArtist({name:'Callejeros', country:'Argentina'});
  unqfy.addAlbum(0,{name: 'Rocanroles sin destino', year: 2019});
  unqfy.addTrack(1,{name: 'Rocanroles sin destino', duration: 500, genres: ['rock']}); 
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