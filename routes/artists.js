const { Router } = require('express');
const connection = require('../connection');
const router = Router();

router.post('/', (connection.executeFunction(['name','country'],(unqfy, req, res) => {
  const newArtist = req.body;
  try {
    const art = unqfy.addArtist(newArtist);
    res.status(201).json(art);
  }
  catch(error) {  
    res.status(409).json({status:409, errorCode:'RESOURCE_ALREADY_EXISTS'});
  }
})));

router.get('/:id', (connection.executeFunction([],(unqfy, req, res) => {
  const { id } = req.params;
  try {
    const artist = unqfy.getArtistById(id);
    res.status(200).json(artist);
  }
  catch(error) {
    res.status(404).json({status:404, errorCode:'RESOURCE_NOT_FOUND'});
  }
}))); 

router.get('/', (connection.executeFunction([],(unqfy, req, res) => {
  const name = req.query.name;
  if(name !== undefined) {
    const artists = unqfy.searchByName(name).artists;
    res.status(200).json(artists);
  }
  else {
    res.status(200).json(unqfy.getAllArtist());
  }
}))); 

router.put('/:id', (connection.executeFunction(['name','country'],(unqfy, req, res) => {
  const { id } = req.params;
  const newName = req.body.name;
  const newCountry = req.body.country;
  try {
    const artist = unqfy.getArtistById(id);
    artist.name = newName;
    artist.country = newCountry;
    res.status(200).json(artist);
  }
  catch(error) {
    res.status(404).json({status:404, errorCode:'RESOURCE_NOT_FOUND'});
  }
})));

router.delete('/:id', (connection.executeFunction([],(unqfy, req, res) => {
  const { id } = req.params;
  try {
    const artist = unqfy.getArtistById(id);
    unqfy.removeArtist(artist.id);
    res.status(204).json({status:204});
  }
  catch(error) {
    res.status(404).json({status:404, errorCode:'RESOURCE_NOT_FOUND'});
  }
})));

module.exports = router;