
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
                    description: doc.description
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
        description: req.body.description,
        quotes: []
    }); 

    project.save().then(function(result) {
        console.log(result); 

        res.status(201).json({
            message: 'Successfully added a new project',
            project: {
                _id: result._id, 
                clientId: result.clientId
            }
        });

    }).catch(function(err) {
        console.log(err); 

        res.status(500).json({
            error: err
        });
    });

}