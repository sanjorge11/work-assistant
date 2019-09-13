
var Project = require('../models/project'); 
var mongoose = require('mongoose'); 

exports.getAllProjects = function(req, res, next) { 

    Project.find()
    .select() 
    .exec()
    .then(function(docs) { 
        var response = {
            count: docs.length, 
            projects: docs.map(function(doc) {
                return { 
                    _id: doc._id, 
                    clientId: doc.clientId,
                    createDate: doc.createDate, 
                    description: doc.description
                    //,quotes: doc.quotes
                }
            })
        };
        res.status(200).json(response); 
    })
    .catch(function(err) { 
        res.status(500).json({
            error: err
        });
    }); 

}

exports.createProject = function(req, res, next) {

    var project = new Project({
        _id: new mongoose.Types.ObjectId(), 
        clientId: req.body.clientId,
        createDate: new Date(), 
        description: req.body.description
        //,quotes: []
    }); 

    project.save().then(function(result) {
        console.log(result); 

        res.status(201).json({
            message: 'Successfully added a new project',
            project: {
                _id: result._id, 
                clientId: result.clientId,
                createDate: result.createDate, 
                description: result.description
                //,quotes: result.quotes
            }
        });

    }).catch(function(err) {
        console.log(err); 

        res.status(500).json({
            error: err
        });
    });

}

exports.updateProject = function(req, res, next) {

    var id = req.params.projectId;

    var props = req.body;

    //we dynamically create an object that has all properties we want updated
    //$set is a propery understood by mongoose to know that the following properties
    //are to be updated with the patch request
    Project.updateOne({ _id: id }, { $set: props })
    .exec()
    .then(function(result) { 
      console.log(result); 
      res.status(200).json({
        message: 'Project information updated'
      }); 
    })
    .catch(function(err) { 
      console.log(err);
      res.status(500).json({
        error: err
      });
    }); 
   
}

exports.deleteProject = function(req, res, next) {

    var id = req.params.projectId; 

    Project.deleteOne({_id: id})
    .exec()
    .then(function(result) { 
        res.status(200).json({
            message: 'Project deleted'
        });
    })
    .catch(function(err) {
        console.log(err);
        res.status(500).json({
            error: err
        }); 
    });

}

exports.deleteClientProjects = function(req, res, next) {

    var id = req.params.clientId; 

    Project.deleteMany({clientId: id})
    .exec()
    .then(function(result) { 
        res.status(200).json({
            message: 'Client projects deleted'
        });
    })
    .catch(function(err) {
        console.log(err);
        res.status(500).json({
            error: err
        }); 
    });

}

