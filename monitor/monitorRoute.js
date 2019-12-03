const { Router } = require('express');
const router = Router();

router.get('/ping', (req, res) => {
  res.status(200).json();
});

router.get('/isAlive', (req, res) => {

});

router.post('/', (req, res) => {

})

module.exports = router;