 
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// set up express app
const app = express();

//connect to mongoDB
mongoose.connect('mongodb://localhost/ninjago');
//set it equal to global promise because their original one is deprecated
mongoose.Promise = global.Promise;

app.use(express.static('public'));

app.use(bodyParser.json());

// initialize routes
app.use('/api',require('./routes/api')
);

//error handling middleware
app.use(function(err, req, res, next){
    
    //console.log(err);
    res.status(422).send({error: err.message});
})


/* // we can pass a few promises, the request parameter(contains info about request made) 
// and response parameter(info about the response, set status codes or send data to client )
app.get('/api', function(req, res){
console.log('get request')
//if we want to send the response with new data
res.send({name: 'Lala'});
}); */

// listen for requests
app.listen(process.env.port || 4000, function(){
    console.log('now listening for requests');
});