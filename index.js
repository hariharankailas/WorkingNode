// const express = require('express')
// const path = require('path')
const PORT = process.env.PORT || 5000

// express()
//   .use(express.static(path.join(__dirname, 'public')))
//   .set('views', path.join(__dirname, 'views'))
//   .set('view engine', 'ejs')
//   .get('/', (req, res) => res.render('pages/index'))
//   .listen(PORT, () => console.log(`Listening on ${ PORT }`))
const express = require('express');
var bodyParser = require('body-parser');
const path = require('path');

var app = express();
var apiai = require('apiai');
var apiapp = apiai("d92b6db3d22745a78f064f96fce19db4");

//Body parser
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res){
  res.send('Hello Salesforce');
});

app.post('/chat', function(req, res){
  console.log('req-->',req);
  var request = apiapp.textRequest(req.body.chatText, {
    sessionId: '.sxFXzAaWbLJ6Ai21h_vHxmWJCK70sB47EqeB6fDCVgQoBXom.PI9eKH9oIvNd'
  });

  request.on('response', function(response) {
      console.log('hh',response);
      res.send(response);
  });
  request.on('error', function(error) {
      console.log(error);

      res.send(error);
  });
  request.end();
});

app.listen(PORT, function(){
  console.log('server started on Port' +PORT);
});
