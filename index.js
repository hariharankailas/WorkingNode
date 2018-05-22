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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res){
res.send('Hello Salesforce');
});

app.post('/chat', function(req, res){
console.log('req-->',req);
console.log('res-->',res);
var request = apiapp.textRequest(req.body.chatText, {
sessionId: '00Dr00000008cge'
});

request.on('response', function(response){
  console.log('hh-intent',response.result.metadata.intentName);
let eventArg;
//Welcome event Fire
console.log("hh-response",req.body.chatText)
// if(response.result.body.chatText =='null'){
//            eventArg = {
//               "name": 'Welcome'
// };
// }

  if(response.result.metadata.intentName == "full_name"){
             eventArg = {
                "name": 'conask'
  };
}

  if(response.result.metadata.intentName == "contact_user - custom"){
             eventArg = {
                "name": 'incdesc'
  };
}

if(eventArg){
var evRequest = apiapp.eventRequest(eventArg, {sessionId: '00Dr00000008cge'});
console.log("hh-event",evRequest)
//
evRequest.on('response', function(response) {
    res.send(response);
});
console.log("hh-event-response",response)
  evRequest.end();
}
else{
  res.send(response);
}

});
request.on('error', function(error) {
  console.log("error",error);

  res.send(error);
});

request.end();

});//app.post ends here

app.listen(PORT, function(){
console.log('server started on Port' +PORT);
});
