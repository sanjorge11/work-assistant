
var express = require('express');
var app = express();
var morgan = require('morgan');  
var bodyParser = require('body-parser'); 
var mongoose = require('mongoose');

var clientRoutes = require('./api/routes/clients');
var projectRoutes = require('./api/routes/projects'); 
var quoteRoutes = require('./api/routes/quotes'); 

//                                          password                     url parameter points to 'root' database in mongoDB
mongoose.connect('mongodb+srv://admin:' + '381025JFdf' + '@rest-api-db-xldnz.mongodb.net/'+ 'root' + '?retryWrites=true&w=majority',
{ useNewUrlParser: true, useCreateIndex: true });   //fixed deprecation warning

app.use(morgan('dev')); //log HTTP requests on console
app.use(bodyParser.json());

//Allow access for CORS and specify which HTTP methods to use
app.use(function(req,res,next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if (req.method === 'OPTIONS') { 
        res.header(
            "Access-Control-Allow-Methods",
            "PUT, POST, PATCH, DELETE, GET"
        );
        return res.status(200).json({});
    }

    next(); 
});

//Static Route
//Note: __dirname will resolve to your project folder
//here it is -> /Users/sanjorge/work-assistant
app.use(express.static(__dirname + '/static'));     //don't need route to static folder to fetch html/js files

//REST API Routes
app.use('/clients', clientRoutes); 
app.use('/projects', projectRoutes); 
app.use('/quotes', quoteRoutes);

//Error-Handling
app.use(function(req, res, next) {  //404 if no match to routes defined 
    var error = new Error('Not Found');
    error.status = 404; 
    next(error);            //send message to the catch-all method
});

app.use(function(error, req, res, next) {   //catch-all error message: 404, 500, etc.
    res.status(error.status || 500); 
    res.json({
        error: {
            message: error.message
        }
    }); 
});


module.exports = app; 