
var Client = require('../models/client');
var mongoose = require('mongoose');

exports.getAllClients = function(req, res, next) { 

    Client.find()
    .select()
    .exec()
    .then(function(docs) {
        var response = {
            count: docs.length, 
            clients: docs.map(function(doc) {   //re-format JSON object to get rid of unwanted info; e.g. __v property
                return {
                    _id: doc._id, 
                    firstName: doc.firstName, 
                    lastName: doc.lastName,  
                    fullName: doc.fullName,  
                    address: doc.address, 
                    phoneNumber: doc.phoneNumber, 
                    email: doc.email
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

exports.createClient = function(req, res, next) { 
    
    var client = new Client({
        _id: new mongoose.Types.ObjectId(), 
        firstName: req.body.firstName, 
        lastName: req.body.lastName, 
        fullName: (req.body.firstName + ' ' + req.body.lastName).trim(),
        address: req.body.address, 
        phoneNumber: req.body.phoneNumber, 
        email: req.body.email
    });

    client.save().then(function(result) {
        console.log(result); 

        res.status(201).json({
            message: 'Successfully added a new client',
            client: {
                _id: result._id, 
                firstName: result.firstName, 
                lastName: result.lastName, 
                fullName: result.fullName,
                address: result.address, 
                phoneNumber: result.phoneNumber, 
                email: result.email
            }
        });

    }).catch(function(err) { 
        console.log(err); 

        res.status(500).json({
            error: err
        });

    });

}