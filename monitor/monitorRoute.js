const { Router } = require('express');
const router = Router();
const monitor = require('./monitor');

router.get('/ping', (req, res) => {
  res.status(200).json();
});

router.get('/isAlive', (req, res) => {
  monitor.isAlive(res);
});

router.post('/', (req, res) => {
  const body = req.body;
  monitor.disableMonitoringPeriodically(body.isActive);
  res.status(200).json();
})

module.exports = router;