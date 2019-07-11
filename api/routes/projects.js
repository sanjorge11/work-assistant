
var express = require('express');
var router = express.Router(); 

var ProjectControlller = require('../controllers/projects'); 

router.get('/', ProjectControlller.getAllProjects);

router.post('/', ProjectControlller.createProject); 

module.exports = router; 