
var mongoose = require('mongoose');

var resourceSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, 
    resourceName: { type: String, required: true }, 
    data: mongoose.Schema.Types.Mixed
}); 

module.exports = mongoose.model('Resource', resourceSchema); 