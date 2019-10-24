const { Router } = require('express');
const router = Router();

router.get('/',(req, res) => {
    res.json({"title": "page office"});
})

module.exports = router;