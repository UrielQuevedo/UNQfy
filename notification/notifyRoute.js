const { Router } = require('express');
const router = Router();
const rp = require('request-promise');
const picklify = require('picklify'); 
const fs = require('fs'); 
const Notification = require('./notification');

function getNotify(filename) {
  let notification = new Notification();
  if (fs.existsSync(filename)) {
    const serializedData = fs.readFileSync(filename, {encoding: 'utf-8'});
    const classes = [Notification];
    notification = picklify.unpicklify(JSON.parse(serializedData), classes);
  }
  return notification;
}

function saveNotify(notification, filename) {
  const serializedData = picklify.picklify(notification);
  fs.writeFileSync(filename, JSON.stringify(serializedData, null, 2));
}

function isNotUndefined(value) {
  return value !== undefined;
}

function execute(params, path, func) {
  return function (req, res) {
    if (params.every(p => isNotUndefined(req.query[p]) || isNotUndefined(req.body[p]))) {
      try {
        const notification = getNotify('notifyDatabase');
        rp.get(`http://localhost:8080/api/artists/${req[path].artistId}`)
          .then(() => {
            func(notification, req, res);
            saveNotify(notification, 'notifyDatabase');
          })
          .catch(() => res.status(404).json({status:404, errorCode: 'RELATED_RESOURCE_NOT_FOUND'}));
      } catch (error) {
        res.status(404).json({status:505, errorCode:'INTERNAL_SERVER_ERROR'});
      }
    } else {
      res.status(400).json({status:400, errorCode:'BAD_REQUEST'});
    }
  };
}

router.post('/suscribe', (execute(['artistId','email'], 'body', (notification, req, res) => {
  const body = req.body;
  notification.suscribe(parseInt(body.artistId), body.email);
  res.status(200).json();
})));

router.post('/unsuscribe', (execute(['artistId','email'], 'body', (notification, req, res) => {
  const body = req.body;
  notification.unsuscribe(parseInt(body.artistId), body.email);
  res.status(200).json();
})));

router.post('/notify', (execute(['artistId', 'subject', 'message'], 'body', (notification, req, res) => {
  const body = req.body;
  notification.notify(parseInt(body.artistId), body.subject, body.message);
  res.status(200).json();
})));

router.get('/suscriptions', (execute(['artistId'], 'query',(notification, req, res) => {
  const artistId  = parseInt(req.query.artistId);
  let emails = notification.getEmails(artistId);
  if (emails === undefined) {
    emails = [];
  }
  res.status(200).json({ artistId: artistId, suscriptors: emails });
}))); 

router.delete('/suscriptions', (execute(['artistId'], 'body',(notification, req, res) => {
  const artistId  = parseInt(req.body.artistId);
  notification.deleteArtist(artistId);
  res.status(200).json();
})));

router.get('/ping', (req, res) => {
  res.status(200).json();
});

module.exports = router;