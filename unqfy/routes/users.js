const { Router } = require('express');
const connection = require('../connection');
const router = Router();

router.post('/', (connection.executeFunction(['name'],(unqfy, req, res) => {
  const newUser = req.body;
  const user = unqfy.addUser(newUser.name);
  unqfy.notifyAllObservers({ message: 'Se agrego el usuario ' + user.name, levelMessage: 'info'});
  res.status(201).json(user);
})));

router.get('/:id', (connection.executeFunction([],(unqfy, req, res) => {
  const { id } = req.params;
  const user = unqfy.getUser(parseInt(id));
  res.status(200).json(user);
}))); 

router.get('/', (connection.executeFunction([],(unqfy, req, res) => {
  res.status(200).json(unqfy.users);
}))); 

router.put('/:id', (connection.executeFunction(['name'],(unqfy, req, res) => {
  const { id } = req.params;
  const user = unqfy.getUser(parseInt(id));
  user.name = req.body.name;
  res.status(200).json(user);
})));

router.delete('/:id', (connection.executeFunction([],(unqfy, req, res) => {
  const { id } = req.params;
  unqfy.sendInfoToLog({ message: 'Se elimino el usuario con id ' + id, levelMessage: 'info'});
  unqfy.removeUser(parseInt(id));
  res.status(204).json({status:204});    
})));

//////////////////////////////////////// user tracks ////////////////////////////////////////

router.get('/:id/tracksHeard', (connection.executeFunction([],(unqfy, req, res) => {
  const { id } = req.params;
  const user = unqfy.getUser(parseInt(id));
  res.status(200).json(user.getTracksHeard());
}))); 

// se asume que el track ya esta creado en UNQfy

router.post('/:id/tracksHeard', (connection.executeFunction(['name'],(unqfy, req, res) => {
  const { id } = req.params;
  const newTrack = req.body;
  const user = unqfy.getUser(parseInt(id));
  const track = unqfy.getTrackByName(newTrack.name);
  unqfy.notifyAllObservers({ message: 'El usuario ' + user.name + ' escucho el track ' + track.name, levelMessage: 'info'});
  user.listenTrack(track);
  res.status(201).json(track);
})));
  
router.get('/:idUser/:idTrack/tracksHeard', (connection.executeFunction([],(unqfy, req, res) => {
  const { idUser , idTrack} = req.params;
  const user = unqfy.getUser(parseInt(idUser));
  res.status(200).json({repeat:user.manyTimesListenTrack(parseInt(idTrack))});
})));
  
module.exports = router;