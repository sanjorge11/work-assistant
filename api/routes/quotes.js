
var express = require('express'); 
var router = express.Router(); 

var QuoteController = require('../controllers/quotes'); 

router.get('/', QuoteController.getAllQuotes);

router.post('/', QuoteController.createQuote);

module.exports = router; 