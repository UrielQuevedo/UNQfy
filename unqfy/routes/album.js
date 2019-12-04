const { Router } = require('express');
const connection = require('../connection');
const router = Router();

router.get('/:id', (connection.executeFunction([],(unqfy, req, res) => {
  const id  = parseInt(req.params.id);
  const album = unqfy.getAlbumById(id);
  res.status(200).json(album);
}))); 

router.post('/', (connection.executeFunction(['artistId','name','year'],(unqfy, req, res) => {
  const dataAlbum = req.body;
  const album = unqfy.addAlbum(parseInt(dataAlbum.artistId), {name:dataAlbum.name, year:dataAlbum.year});
  const artist = unqfy.getArtistById(dataAlbum.artistId);
  unqfy.notifyAllObserversAddAlbum(artist, dataAlbum.name);
  res.status(201).json(album);
})));

router.delete('/:id', (connection.executeFunction([],(unqfy, req, res) => {
  const { id } = req.params;
  const album = unqfy.getAlbumById(parseInt(id));
  unqfy.notifyAllObservers({ message: 'Se elimino el album ' + album.name, levelMessage: 'info'});
  unqfy.removeAlbum(album.id);
  res.status(204).json({status:204});
})));

router.get('/', (connection.executeFunction([],(unqfy, req, res) => {
  const name = req.query.name;
  if(name !== undefined) {
    const albums = unqfy.searchByName(name).albums;
    res.status(200).json(albums);
  }
  else {
    res.status(200).json(unqfy.getAllAlbums());
  }
})));

router.patch('/:id', (connection.executeFunction(['year'],(unqfy, req, res) => {
  const { id } = req.params;
  const album = unqfy.getAlbumById(parseInt(id));
  album.year = req.body.year;
  res.status(200).json(album);
})));

module.exports = router;