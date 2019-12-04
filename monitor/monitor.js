const rp = require('request-promise');
const slackService = require('./slackService');
let preiodically = true;
const services = [
  { port: 8080, name: 'UNQfy', status: false},
  { port: 8000, name: 'Notification', status: false}
]

function isAlive(res) {
  Promise.all(services.map((service) => checkService(service)))
  .then((servicesStatus) => res.status(200).json(servicesStatus));
}

function checkService(service) {
   return isAliveP(service.port)
      .then(() => {
        if (!service.status) {
          slackService.notifyServiceIsWorking(service.name)
          service.status = true
        }
        return true;
      })
      .catch(() => {
        slackService.notifyServiceIsNotWorking(service.name)
        return false;
      })
      .then((isOnline) => {
        return {
          service: service.name,
          status: (isOnline ? 'Enable' : 'Desable')
      };
    });
}

function isAliveP(port) {
  return rp.get(`http://localhost:${port}/api/ping`);
}

function disableMonitoringPeriodically(bool) {
  preiodically = bool;
}

module.exports = {
  isAlive,
  disableMonitoringPeriodically,
}