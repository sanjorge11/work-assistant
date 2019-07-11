
var mongoose = require('mongoose');

var projectSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, 
    clientId: String
    //need to add more fields to comply with invoice-generator API
}); 

module.exports = mongoose.model('Project', projectSchema); 