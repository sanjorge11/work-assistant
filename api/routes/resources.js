
var express = require('express'); 
var router = express.Router(); 

var ResourceController = require('../controllers/resources'); 

router.get('/', ResourceController.getAllResources);

router.post('/', ResourceController.createResource); 

router.delete('/:resourceId', ResourceController.deleteResource);

module.exports = router; 