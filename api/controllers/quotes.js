
var Quote = require('../controllers/quotes'); 
var mongoose = require('mongoose'); 

exports.getAllQuotes = function(req, res, next) { 
    Quote.find()
    .select() 
    .exec()
    .then(function(docs) { 
        var response = {
            count: docs.length, 
            projects: docs.map(function(doc) {
                return { 
                    _id: doc._id,
                    projectTotal: doc.projectTotal, 
                    header: doc.header, 
                    to_title: doc.to_title, 
                    logo: doc.logo,
                    from: doc.from,     
                    to: doc.to,
                    date: doc.date,
                    currency: doc.currency,
                    number: doc.number,   
                    payment_terms: doc.payment_terms,   
                    items: doc.items, 
                    fields: doc.fields,
                    tax: doc.tax,
                    discounts: doc.discounts,
                    shipping: doc.shipping,
                    notes: doc.notes,
                    terms: doc.terms
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