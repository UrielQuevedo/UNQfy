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

function executeFunction(func) {
  return function (req, res) {
    const unqfy = getUNQfy('database');
    func(unqfy, req, res);
    saveUNQfy(unqfy,'database');
  };
}

module.exports = {
  executeFunction,
};