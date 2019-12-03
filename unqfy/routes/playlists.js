const { Router } = require('express');
const connection = require('../connection');
const router = Router();

router.get('/:id', (connection.executeFunction([],(unqfy, req, res) => {
  const id  = parseInt(req.params.id);
  const playlist = unqfy.getPlaylistById(id);
  res.status(200).json(playlist);
}))); 

router.post('/', (connection.executeFunction(['name'],(unqfy, req, res) => {
  const newPlaylist = req.body;
  const name = newPlaylist.name;
  const genres = newPlaylist.genres;
  const maxDuration = newPlaylist.maxDuration;
  const tracksId = newPlaylist;
  if(genres !== undefined && maxDuration !== undefined ) {
    const playlist = unqfy.createPlaylist(name, genres, maxDuration);
    res.status(201).json(playlist);
  } else if(tracksId !== undefined) {
    const playlist = unqfy.createPlaylistByTracks(name, tracksId);
    res.status(201).json(playlist);
  } else {
    res.status(400).json({status:400, errorCode:'BAD_REQUEST'});
  }
})));

router.delete('/:id', (connection.executeFunction([],(unqfy, req, res) => {
  const { id } = req.params;
  unqfy.removePlayList(parseInt(id));
  res.status(204).json({status:204});
})));

router.get('/', (connection.executeFunction([],(unqfy, req, res) => {
  const query = req.query;
  const keys = Object.keys(query);
  if(keys.lenght() !== 0) {
    const playlists = searchByParams(keys, unqfy.playlists, query);
    res.status(200).json(playlists);
  } else {
    res.status(400).json({status:400, errorCode:'BAD_REQUEST'});
  }
})));

function searchByParams(params, playlists, query) {
  const reduce = (accumulate, currentValue) => executeFilter(currentValue, accumulate, query);
  return params.reduce(reduce, playlists);
}

const executeFilter = (param, list, query) => {
  return list.filter(e => functionsByFilter[param](e, query[param]));
};

const _byName = (e, value) => {
  return e.name === value;
};

const _byDurationLT = (e, value) => {
  return e.maxDuration <= value;
};

const _byDurationGT = (e, value) => {
  return e.maxDuration >= value;
};

const functionsByFilter = {
  name: _byName,
  durationLT: _byDurationLT,
  durationGT: _byDurationGT,
};

module.exports = router;