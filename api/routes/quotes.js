
var express = require('express'); 
var router = express.Router(); 

var QuoteController = require('../controllers/quotes'); 

router.get('/', QuoteController.getAllQuotes);

router.get('/:quoteId', QuoteController.getQuote); 

router.get('/relatedProject/:projectId', QuoteController.getProjectQuotes); 

router.get('/uploads/:quoteId', QuoteController.getQuotePDF);    //route for uploaded PDFs

router.post('/', QuoteController.createQuote);

module.exports = router; 