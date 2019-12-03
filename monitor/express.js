const express = require('express');
const app = express();

// settings
app.set('port', process.env.PORT || 8001); 
app.set('json spaces', 2);

// middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json()); 

// routes 
app.use('/api',require('./monitorRoute'));
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    res.status(400).json({status:400, errorCode:'BAD_REQUEST'});
  }
});

// starting the server

app.listen(app.get('port'), () => {
  console.log('Server on port',app.get('port'));
});