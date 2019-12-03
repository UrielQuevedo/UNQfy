const { Router } = require('express');
const router = Router();
const Log = require('./log');
const Desactivate = require('./desactivate');
const log = new Log();

router.post('/', (req, res) => {
    log.saveEventLocal(req.body);
    log.saveEventLoggly(req.body);
    res.status(200);
});

module.exports = router;
