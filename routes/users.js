const { Router } = require('express');
const router = Router();
const { UNQfy } = require('../unqfy');
const unqfy = new UNQfy();


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
    res.status(200).json(user.tracksHeard);
  }
  catch(error) {
    res.status(404).json({status:404, errorCode:'RESOURCE_NOT_FOUND'});
  }
}); 

// se asume que el track ya esta creado en UNQfy

router.post('/:id/tracksHeard', (req, res) => {
  const { id } = req.params;
  const newTrack = req.body;
  console.log(newTrack);
  try { 
    const user = unqfy.getUser(id);
    user.listenTrack(newTrack);
    res.status(201).json(newTrack);
  }
  catch(error) {
    res.status(404).json({status:404, errorCode:'RESOURCE_NOT_FOUND', message: error.message});
  }
});
  
module.exports = router;