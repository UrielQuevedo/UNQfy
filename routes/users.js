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

module.exports = router;