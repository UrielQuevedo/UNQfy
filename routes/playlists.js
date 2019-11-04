const { Router } = require('express');
const connection = require('../connection');
const router = Router();

//LISTO
router.get('/:id', (connection.executeFunction([],(unqfy, req, res) => {
  const id  = req.params.id;
  const playlist = unqfy.getPlaylistById(id);
  res.status(200).json(playlist);
}))); 

router.post('/', (connection.executeFunction(['name'],(unqfy, req, res) => {
  const newPlaylist = req.body;
  res.status(201).json();
})));

//LISTO
router.delete('/:id', (connection.executeFunction([],(unqfy, req, res) => {
  const { id } = req.params;
  unqfy.removePlayList(id);
  res.status(204).json({status:204});
})));

router.get('/', (connection.executeFunction([],(unqfy, req, res) => {
  const query = req.query;
  if(query.name !== undefined || query.durationLT !== undefined || query.durationGT !== undefined) {
    const playlists = unqfy.searchByName(query.name).playlists;
    res.status(200).json(playlists);
  }
  else {
    res.status(200).json(unqfy.getAllAlbums());
  }
})));

module.exports = router;