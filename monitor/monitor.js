const rp = require('request-promise');

function isAlive() {
  this.isAliveNotification()
    .then(() => this.isAliveUNQfy())
    .then(() => this.isAliveLogging())
    .then()
    .cath();
}

function isAliveNotification() {
  rp.get('http://localhost:8080/api/ping');
}