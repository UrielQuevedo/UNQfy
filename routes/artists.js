const { Router } = require('express');
const router = Router();
const { UNQfy } = require('../unqfy');
const unqfy = new UNQfy();

router.post('/', (req, res) => {
    const newArtist = req.body;
    try {
         res.status(201).json(unqfy.addArtist(newArtist));
    }
    catch {
        res.status(409).json({status: 409, errorCode:"RESOURCE_ALREADY_EXISTS"});
    }
});

module.exports = router;