
var mongoose = require('mongoose');

var clientSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, 
    firstName: { type: String, required: true }, 
    lastName: { type: String, required: false },  
    fullName: { type: String, required: false },  //will be just a concatenation of first and last name 
    address: { type: String, required: true }, 
    phoneNumber: { type: String, required: false }, 
    email: {
        type: String, 
        required: true, 
        unique: false,  //multiple clients can use same email if they need to do so
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ //regular expression for valid email address
    }
}); 

module.exports = mongoose.model('Client', clientSchema);