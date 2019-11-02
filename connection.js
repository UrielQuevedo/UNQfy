const fs = require('fs');
const unqmod = require('./unqfy');

function getUNQfy(filename = 'data.json') {
  let unqfy = new unqmod.UNQfy();
  if (fs.existsSync(filename)) {
    unqfy = unqmod.UNQfy.load(filename);
  }
  return unqfy;
}

function saveUNQfy(unqfy, filename = 'data.json') {
  unqfy.save(filename);
}

function isNotUndefined(value) {
  return value !== undefined;
}

function executeFunction(params,func) {
  return function (req, res) {
    if (params.every(p => isNotUndefined(req.query[p]) || isNotUndefined(req.body[p]))) {
      const unqfy = getUNQfy('database');
      func(unqfy, req, res);
      saveUNQfy(unqfy,'database');
    } else {
      res.status(400).json({status:400, errorCode:'BAD_REQUEST'});
    }
  };
}

module.exports = {
  executeFunction,
};