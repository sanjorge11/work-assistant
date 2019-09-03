
var https = require("https");
var fs = require("fs");
var Resource = require('../models/resource'); 
var mongoose = require('mongoose'); 

exports.getAllResources = function(req, res, next) { 
    Resource.find()
    .select() 
    .exec()
    .then(function(docs) { 
        var response = {
            count: docs.length, 
            resources: docs.map(function(doc) {
                return { 
                    _id: doc._id,
                    resourceName: doc.resourceName,
                    data: doc.data
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


exports.createResource = function(req, res, next) {

    var resource = new Resource({
        _id: new mongoose.Types.ObjectId(), 
        resourceName: req.body.resourceName,
        data: req.body.data
    }); 

    resource.save().then(function(result) {
        console.log(result); 

        res.status(201).json({
            message: 'Successfully added a new resource',
            resource: {
                _id: result._id, 
                resourceName: result.resourceName,
                data: result.data
            }
        });

    }).catch(function(err) {
        console.log(err); 

        res.status(500).json({
            error: err
        });
    });

}


exports.deleteResource = function(req, res, next) {

    var id = req.params.resourceId; 

    Resource.deleteOne({_id: id})
    .exec()
    .then(function(result) { 
        res.status(200).json({
            message: 'Resource deleted'
        });
    })
    .catch(function(err) {
        console.log(err);
        res.status(500).json({
            error: err
        }); 
    });

}