const { Router } = require('express');
const router = Router();
const Desactivate = require('./desactivate');
const fs = require('fs'); 
const Log = require('./log');
const log = new Log();

function getLog(filename) {
    let log = new Log();
    if (fs.existsSync(filename)) {
      const serializedData = fs.readFileSync(filename, {encoding: 'utf-8'});
      const classes = [Log];
      log = picklify.unpicklify(JSON.parse(serializedData), classes);
    }
    return log;
  }
  
function saveLog(log, filename) {
    const serializedData = picklify.picklify(log);
    fs.writeFileSync(filename, JSON.stringify(serializedData, null, 2));
  }


function isNotUndefined(value) {
  return value !== undefined;
}

function execute(params,func) {
    return function (req, res) {
      if (params.every(p => isNotUndefined(req.query[p]) || isNotUndefined(req.body[p]))) {
        try {
          const log = getLog('logDatabase');
          func(log, req, res);
          saveLog(log,'logDatabase');
        } catch (error) {
          res.status(404).json({status:505, errorCode:'INTERNAL_SERVER_ERROR'});
        }
      } else {
        res.status(400).json({status:400, errorCode:'BAD_REQUEST'});
      }
    };
}

router.post('/', (req, res) => {
    log.saveEventLocal(req.body);
    log.saveEventLoggly(req.body);
    res.status(200);
});

module.exports = router;
