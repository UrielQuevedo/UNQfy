const { Router } = require('express');
const connection = require('../connection');
const router = Router();

router.post('/', (connection.executeFunction(['name'],(unqfy, req, res) => {
  const newUser = req.body;
  try {
    const user = unqfy.addUser(newUser.name);
    res.status(201).json(user);
  }
  catch(error) {
    res.status(409).json({status:409, errorCode:'RESOURCE_ALREADY_EXISTS'});
  }
})));

router.get('/:id', (connection.executeFunction([],(unqfy, req, res) => {
  const { id } = req.params;
  try {
    const user = unqfy.getUser(id);
    res.status(200).json(user);
  }
  catch(error) {
    res.status(404).json({status:404, errorCode:'RESOURCE_NOT_FOUND'});
  }
}))); 

router.get('/', (connection.executeFunction([],(unqfy, req, res) => {
  res.status(200).json(unqfy.users);
}))); 

router.put('/:id', (connection.executeFunction([],(unqfy, req, res) => {
  const { id } = req.params;
  const newName = req.body.name;
  try {
    const user = unqfy.getUser(id);
    user.name = newName;
    res.status(200).json(user);
  }
  catch(error) {
    res.status(404).json({status:404, errorCode:'RESOURCE_NOT_FOUND'});
  }
})));

router.delete('/:id', (connection.executeFunction([],(unqfy, req, res) => {
  const { id } = req.params;
  try {
    unqfy.removeUser(id);
    res.status(204).json({status:204});    
  }
  catch(error) {
    res.status(404).json({status:404, errorCode:'RESOURCE_NOT_FOUND'});
  }
})));

//////////////////////////////////////// user tracks ////////////////////////////////////////

router.get('/:id/tracksHeard', (connection.executeFunction([],(unqfy, req, res) => {
  const { id } = req.params;
  try {
    const user = unqfy.getUser(id);
    res.status(200).json(user.getTracksHeard());
  }
  catch(error) {
    res.status(404).json({status:404, errorCode:'RESOURCE_NOT_FOUND'});
  }
}))); 

// se asume que el track ya esta creado en UNQfy

router.post('/:id/tracksHeard', (connection.executeFunction([],(unqfy, req, res) => {
  const { id } = req.params;
  const newTrack = req.body;
  try { 
    const user = unqfy.getUser(id);
    const track = unqfy.getTrackByName(newTrack.name);
    user.listenTrack(track);
    res.status(201).json(track);
  }
  catch(error) {
    res.status(404).json({status:404, errorCode:'RESOURCE_NOT_FOUND', message:error.message});
  }
})));
  
router.get('/:idUser/:idTrack/tracksHeard', (connection.executeFunction([],(unqfy, req, res) => {
  const { idUser , idTrack} = req.params;
  try { 
    const user = unqfy.getUser(idUser);
    res.status(200).json({repeat:user.manyTimesListenTrack(idTrack)});
  }
  catch(error) {
    res.status(404).json({status:404, errorCode:'RESOURCE_NOT_FOUND'});
  }
})));
  
module.exports = router;