
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
                    city: doc.city,
                    state: doc.state,
                    zip: doc.zip,
                    fullAddress: doc.fullAddress,
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

exports.getClient = function(req, res, next) { 

    var id = req.params.clientId; 

    Client.findById(id)
    .exec()
    .then(function(doc) {
        if(doc) { 
            res.status(200).json({
                client: doc
            });
        } else { 
            res.status(404).json({
                message: "Client not found"
            });
        }
    })
    .catch(function(err) { 
        console.log(err);
        res.status(500).json({error: err}); 
    });

}

exports.createClient = function(req, res, next) { 
    
    var client = new Client({
        _id: new mongoose.Types.ObjectId(), 
        firstName: req.body.firstName, 
        lastName: req.body.lastName, 
        fullName: (req.body.firstName + ' ' + req.body.lastName),
        address: req.body.address, 
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        fullAddress: (req.body.address + '\n' + req.body.city + ', ' + req.body.state + ' ' + req.body.zip),
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
                city: result.city,
                state: result.state,
                zip: result.zip,
                fullAddress: result.fullAddress,
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

exports.updateClient = function(req, res, next) {
    var id = req.params.clientId;

    var props = req.body;

    //we dynamically create an object that has all properties we want updated
    //$set is a propery understood by mongoose to know that the following properties
    //are to be updated with the patch request
    Client.updateOne({ _id: id }, { $set: props })
    .exec()
    .then(function(result) { 
      console.log(result); 
      res.status(200).json({
        message: 'Client information updated'
      }); 
    })
    .catch(function(err) { 
      console.log(err);
      res.status(500).json({
        error: err
      });
    }); 
   
}

exports.deleteClient = function(req, res, next) {

    var id = req.params.clientId; 

    Client.deleteOne({_id: id})
    .exec()
    .then(function(result) { 
        res.status(200).json({
            message: 'Client deleted'
        });
    })
    .catch(function(err) {
        console.log(err);
        res.status(500).json({
            error: err
        }); 
    });

}