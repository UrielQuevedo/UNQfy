const { Router } = require('express');
const connection = require('../connection');
const router = Router();

router.post('/', (connection.executeFunction(['name','country'],(unqfy, req, res) => {
  const newArtist = req.body;
  const art = unqfy.addArtist(newArtist);
  unqfy.notifyAllObservers({ message: 'Se agrego el artista ' + art.name, levelMessage: 'info'});
  res.status(201).json(art);
})));

router.get('/:id', (connection.executeFunction([],(unqfy, req, res) => {
  const { id } = req.params;
  const artist = unqfy.getArtistById(parseInt(id));
  res.status(200).json(artist);
}))); 

router.get('/', (connection.executeFunction([],(unqfy, req, res) => {
  const name = req.query.name;
  if(name !== undefined) {
    const artists = unqfy.searchByName(name).artists;
    res.status(200).json(artists);
  }
  else {
    const artists = unqfy.artists;
    return res.status(200).json(artists);
  }
}))); 

router.put('/:id', (connection.executeFunction(['name','country'],(unqfy, req, res) => {
  const { id } = req.params;
  const newName = req.body.name;
  const newCountry = req.body.country;
  const artist = unqfy.getArtistById(parseInt(id));
  artist.name = newName;
  artist.country = newCountry;
  res.status(200).json(artist);
})));

router.delete('/:id', (connection.executeFunction([],(unqfy, req, res) => {
  const { id } = req.params;
  const artist = unqfy.getArtistById(parseInt(id));
  unqfy.notifyAllObservers({ message: 'Se elimino el artista ' + artist.name, levelMessage: 'info'});
  unqfy.removeArtist(artist.id);
  res.status(204).json({status:204});
})));

module.exports = router;