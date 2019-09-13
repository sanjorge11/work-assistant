
var mongoose = require('mongoose');

var projectSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, 
    clientId: String, 
    createDate: Date,
    description: String
   // ,quotes: [mongoose.Schema.Types.Mixed]     //array of type Quote
}); 

module.exports = mongoose.model('Project', projectSchema); 