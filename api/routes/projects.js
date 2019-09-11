
var express = require('express');
var router = express.Router(); 
//var multer = require('multer');

var ProjectControlller = require('../controllers/projects'); 

// var storage = multer.diskStorage({
//     //these two functions are ran whenever a file is uploaded,
//     // done by multer 
//     destination: function(req, file, callback) {  
//       //file destination
//       //callback parameters: error we define, file path to store 
//       //here we expect no error, so error parameter is null
//       callback(null, './uploads/'); 
//     }, 
//     filename: function(req, file, callback) { 
//       //set a filename to upload
//       callback(null, file.originalname); //new Date().toISOString() + file.originalname 
//     }
//   });

// var fileFilter = function(req, file, callback) { 
//     if (file.mimetype === 'application/pdf') { 
//       callback(null, true); //accepts storage of file
//     } else { 
//       callback(null, false); 
//     }
//   }; 

// var upload = multer({storage: storage, limits: { //set custom storage scheme we defined
//     fileSize: (1024*1024)*5 //option to limit fileSize, here we limit to 5MB (1024*1024) is 1MB
// },
//     fileFilter: fileFilter
// });  

router.get('/', ProjectControlller.getAllProjects);

router.post('/', ProjectControlller.createProject); 

router.delete('/:projectId', ProjectControlller.deleteProject); 

module.exports = router; 