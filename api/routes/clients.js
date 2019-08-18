
var express = require('express');
var router = express.Router(); 

var ClientsController = require('../controllers/clients');

router.get('/', ClientsController.getAllClients);

router.get('/:clientId', ClientsController.getClient)

router.post('/', ClientsController.createClient); 

router.put('/:clientId', ClientsController.updateClient);

router.delete('/:clientId', ClientsController.deleteClient);

module.exports = router; 