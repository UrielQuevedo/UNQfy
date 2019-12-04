const express = require('express'); // Express web server framework
const bodyParser = require('body-parser');

const PORT = 8081 ;

const app = express();

app.use(bodyParser.json());
app.use('/api', require('./logRoute'));

// manage 404 not found
app.use((req, res) => {
  res.status(404);
  res.json({status: 404, errorCode: 'RESOURCE_NOT_FOUND'});
});

app.listen(PORT, () => {console.log(`Listening on ${PORT}`);});