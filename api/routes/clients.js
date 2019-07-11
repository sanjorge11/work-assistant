
var express = require('express');
var router = express.Router(); 

var ClientsController = require('../controllers/clients');

router.get('/', ClientsController.getAllClients);

router.post('/', ClientsController.createClient); 

module.exports = router; 