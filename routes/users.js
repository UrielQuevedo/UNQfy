const { Router } = require('express');
const connection = require('../connection');
const router = Router();
const unqfy = connection.getUNQfy('database');


router.post('/', (req, res) => {
  const newUser = req.body;
  if(newUser.name) {
    try {
      res.status(201).json(unqfy.addUser(newUser.name));
    }
    catch(error) {
      res.status(409).json({status:409, errorCode:'RESOURCE_ALREADY_EXISTS'});
    }
  }
  else {
    res.status(400).json({status:400, errorCode:'BAD_REQUEST'});
  }     
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  try {
    const user = unqfy.getUser(id);
    res.status(200).json(user);
  }
  catch(error) {
    res.status(404).json({status:404, errorCode:'RESOURCE_NOT_FOUND'});
  }
}); 

router.get('/', (req, res) => {
  res.status(200).json(unqfy.users);
}); 

router.put('/:id', (req, res) => {
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
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  try {
    unqfy.removeUser(id);
    res.status(204).json({status:204});    
  }
  catch(error) {
    res.status(404).json({status:404, errorCode:'RESOURCE_NOT_FOUND'});
  }
});

router.get('/:id/tracksHeard', (req, res) => {
  const { id } = req.params;
  try {
    const user = unqfy.getUser(id);
    res.status(200).json(user.getTracksHeards());
  }
  catch(error) {
    res.status(404).json({status:404, errorCode:'RESOURCE_NOT_FOUND'});
  }
}); 

// se asume que el track ya esta creado en UNQfy

router.post('/:id/tracksHeard', (req, res) => {
  const { id } = req.params;
  const track = req.body;
  try { 
    const user = unqfy.getUser(id);
    user.listenTrack(track);
    res.status(201).json(track);
  }
  catch(error) {
    res.status(404).json({status:404, errorCode:'RESOURCE_NOT_FOUND', message:error.message});
  }
});
  
router.get('/:idUser/:idTrack/tracksHeard', (req, res) => {
  const { idUser , idTrack} = req.params;
  try { 
    const user = unqfy.getUser(idUser);
    res.status(201).json({repeat:user.manyTimesListenTrack(idTrack)});
  }
  catch(error) {
    res.status(404).json({status:404, errorCode:'RESOURCE_NOT_FOUND'});
  }
});
  
module.exports = router;