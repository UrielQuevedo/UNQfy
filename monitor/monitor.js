const rp = require('request-promise');
const slackService = require('./slackService');
let preiodically = true;
const services = [
  { port: 5000, ip:'172.20.0.21', name: 'UNQfy', status: false},
  { port: 5001, ip:'172.20.0.22', name: 'Notification', status: false},
  { port: 5003, ip:'172.20.0.24', name: 'Logging', status: false}
]

function isAlive(res) {
  Promise.all(services.map((service) => checkService(service)))
  .then((servicesStatus) => res.status(200).json(servicesStatus));
}

function checkService(service) {
   return isAliveP(service.port, service.id)
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
          status: (isOnline ? 'Enabled' : 'Disabled')
      };
    });
}

function isAliveP(port, id) {
  return rp.get(`http://${id}:${port}/api/ping`);
}

function disableMonitoringPeriodically(bool) {
  preiodically = bool;
}

function intervalFunc() {
  if(preiodically) {
    services.map((service) => checkService(service));
  }
}

setInterval(intervalFunc, 15000);

module.exports = {
  isAlive,
  disableMonitoringPeriodically,
}