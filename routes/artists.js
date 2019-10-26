const { Router } = require('express');
const router = Router();
const { UNQfy } = require('../unqfy');
const unqfy = new UNQfy();

router.post('/', (req, res) => {
      const newArtist = req.body;
      if(newArtist.name && newArtist.country) {
        try {
             res.status(201).json(unqfy.addArtist(newArtist));
        }
        catch {
            res.status(409).json({status:409, errorCode:"RESOURCE_ALREADY_EXISTS"});
        }
    }
    else {
        res.status(400).json({status:400, errorCode:"BAD_REQUEST"});
    } 
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    try {
        const artist = unqfy.getArtistById(id);
        res.status(200).json(artist);
    }
    catch {
        res.status(404).json({status:404, errorCode:"RESOURCE_NOT_FOUND"});
    }
}); 

router.get('/', (req, res) => {
    const name = req.query.name;
    if(name) {
      res.status(200).json(unqfy.searchByName(name).artists);
    }
    else {
      res.status(200).json(unqfy.artists);
    }
}); 

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const newName = req.body.name;
    const newCountry = req.body.country;
    try {
        const artist = unqfy.getArtistById(id);
        artist.name = newName;
        artist.country = newCountry;
        res.status(200).json(artist);
     }
    catch {
        res.status(404).json({status:404, errorCode:"RESOURCE_NOT_FOUND"});
    }
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    try {
        const artist = unqfy.getArtistById(id);
        unqfy.removeArtist(artist.id);
        res.status(204).json({status:204});
    }
    catch {
        res.status(404).json({status:404, errorCode:"RESOURCE_NOT_FOUND"});
    }
});

module.exports = router;