const { Router } = require('express');
const connection = require('../connection');
const router = Router();

router.get('/:id', (connection.executeFunction([],(unqfy, req, res) => {
  const id  = req.params.id;
  try {
    const album = unqfy.getAlbumById(id);
    res.status(200).json(album);
  }
  catch(error) {
    res.status(404).json({status:404, errorCode:'RESOURCE_NOT_FOUND' });
  }
}))); 

router.post('/', (connection.executeFunction(['artistId','name','year'],(unqfy, req, res) => {
  const dataAlbum = req.body;
  try {
    const album = unqfy.addAlbum(dataAlbum.artistId, {name:dataAlbum.name, year:dataAlbum.year});
    res.status(201).json(album);
  } catch (error) {
    catchError(error, res);
  }
})));

router.delete('/:id', (connection.executeFunction([],(unqfy, req, res) => {
  const { id } = req.params;
  try {
    const album = unqfy.getAlbumById(id);
    unqfy.removeAlbum(album.id);
    res.status(204).json({status:204});
  } catch (error) {
    res.status(404).json({status:404, errorCode:'RESOURCE_NOT_FOUND'});
  }
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
  try {
    const album = unqfy.getAlbumById(id);
    album.year = req.body.year;
    res.status(200).json(album);
  }
  catch(error) {
    catchError(error, res);
  }
  
})));

const _theAlbumWithThatNameAlreadyExistException = (res) => {
  res.status(409).json({status:409, errorCode:'RESOURCE_ALREADY_EXISTS'});
};

const _nonExistentArtistException = (res) => {
  res.status(404).json({status:404, errorCode:'RELATED_RESOURCE_NOT_FOUND'});
};

const _nonExistentAlbumException = (res) => {
  res.status(404).json({status:404, errorCode:'RESOURCE_NOT_FOUND'});
};

function catchError(error, res) {
  errors[error.name](res);
}

const errors = {
  theAlbumWithThatNameAlreadyExistException: _theAlbumWithThatNameAlreadyExistException,
  nonExistentArtistException: _nonExistentArtistException,
  nonExistentAlbumException: _nonExistentAlbumException,
};

module.exports = router;