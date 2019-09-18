
var express = require('express'); 
var router = express.Router(); 

var QuoteController = require('../controllers/quotes'); 

router.get('/', QuoteController.getAllQuotes);

router.get('/:quoteId', QuoteController.getQuote); 

//router.put('/:quoteId', QuoteController.updateQuote); 

router.delete('/:quoteId', QuoteController.deleteQuote); 

router.get('/relatedProject/:projectId', QuoteController.getProjectQuotes); 

router.delete('/relatedProject/:projectId', QuoteController.deleteProjectQuotes);

router.delete('/relatedClient/:clientId', QuoteController.deleteClientQuotes);

router.get('/uploads/:quoteId', QuoteController.getQuotePDF);    //route for uploaded PDFs

router.post('/', QuoteController.createQuote);

module.exports = router; 