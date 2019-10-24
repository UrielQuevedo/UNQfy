const { Router } = require('express');
const router = Router();
const unqfy = require('../unqfy');
console.log(unqfy);

router.post('/', (req, res) => {
    const { name, content} = req.body;
    // validar que los datos existan
    if(name && content) {
         const newArtist = {...req.body}; 
         files.push(newFile);
         res.json(files);
    } else {
        res.status(500).json({error: 'Ocurrio un error'});
    }
})

module.exports = router;