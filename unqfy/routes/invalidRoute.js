const { Router } = require('express');
const router = Router();

router.post('/', (req, res) => {
  res.status(404).json({status:404, errorCode:'RESOURCE_NOT_FOUND'});
});

module.exports = router;