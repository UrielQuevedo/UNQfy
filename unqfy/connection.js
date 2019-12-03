const fs = require('fs');
const unqmod = require('./unqfy');

function getUNQfy(filename = 'data.json') {
  let unqfy = new unqmod.UNQfy();
  if (fs.existsSync(filename)) {
    unqfy = unqmod.UNQfy.load(filename);
  }
  return unqfy;
}

function saveUNQfy(unqfy, filename = 'data.json') {
  unqfy.save(filename);
}

function isNotUndefined(value) {
  return value !== undefined;
}

function executeFunction(params,func) {
  return function (req, res) {
    if (params.every(p => isNotUndefined(req.query[p]) || isNotUndefined(req.body[p]))) {
      try {
        const unqfy = getUNQfy('database');
        func(unqfy, req, res);
        saveUNQfy(unqfy,'database');
      } catch (error) {
        catchError(error, res);
      }
    } else {
      res.status(400).json({status:400, errorCode:'BAD_REQUEST'});
    }
  };
}

const _theAlbumWithThatNameAlreadyExistException = (res) => {
  res.status(409).json({status:409, errorCode:'RESOURCE_ALREADY_EXISTS'});
};
  
const _nonExistentArtistException = (res) => {
  res.status(404).json({status:404, errorCode:'RESOURCE_NOT_FOUND'});
};
  
const _nonExistentAlbumException = (res) => {
  res.status(404).json({status:404, errorCode:'RESOURCE_NOT_FOUND'});
};

const _theArtistWithThatNameAlreadyExistsExceptions = (res) => {
  res.status(409).json({status:409, errorCode:'RESOURCE_ALREADY_EXISTS'});
};

const _nonExistentArtistAlbumException = (res) => {
  res.status(404).json({status:404, errorCode:'RELATED_RESOURCE_NOT_FOUND'});
};

const _userExist = (res) => {
  res.status(409).json({status:409, errorCode:'RESOURCE_ALREADY_EXISTS'});
};

const _userNotFound = (res) => {
  res.status(404).json({status:404, errorCode:'RESOURCE_NOT_FOUND'});
};

const _playlistNotFound = (res) => {
  res.status(404).json({status:404, errorCode:'RESOURCE_NOT_FOUND'});
};

const _trackNotFoundId = (res) => {
  res.status(404).json({status:404, errorCode:'RELATED_RESOURCE_NOT_FOUND'});
};

function catchError(error, res) {
  errors[error.name](res);
}
  
const errors = {
  theAlbumWithThatNameAlreadyExistException: _theAlbumWithThatNameAlreadyExistException,
  nonExistentArtistException: _nonExistentArtistException,
  nonExistentAlbumException: _nonExistentAlbumException,
  theArtistWithThatNameAlreadyExistsExceptions: _theArtistWithThatNameAlreadyExistsExceptions,
  nonExistentArtistAlbumException: _nonExistentArtistAlbumException,
  userExist: _userExist,
  userNotFound: _userNotFound,
  playlistNotFound: _playlistNotFound,
  trackNotFoundId: _trackNotFoundId,
};

module.exports = {
  executeFunction,
  saveUNQfy,
  getUNQfy,
};