
var https = require("https");
var fs = require("fs");
var Quote = require('../models/quote'); 
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
                    terms: doc.terms,
                    quotePDFpath: doc.quotePDFpath
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

exports.createQuote = function(req, res, next) {

    var quote = new Quote({
        _id: new mongoose.Types.ObjectId(),
        projectTotal: req.body.projectTotal, 
        header: req.body.header, 
        to_title: req.body.to_title, 
        logo: req.body.logo,
        from: req.body.from,     
        to: req.body.to,
        date: req.body.date,
        currency: req.body.currency,
        number: req.body.number,   
        payment_terms: req.body.payment_terms,   
        items: req.body.items, 
        fields: req.body.fields,
        tax: req.body.tax,
        discounts: req.body.discounts,
        shipping: req.body.shipping,
        notes: req.body.notes,
        terms: req.body.terms,
        quotePDFpath: null
    }); 

    generateInvoice(quote, (quote._id+'.pdf'), function() {
        console.log("Saved invoice to " + (quote._id+'.pdf'));

        var pdfPath = 'uploads/'+(quote._id+'.pdf'); 

        quote.quotePDFpath = pdfPath; 

        quote.save().then(function(result) {
            console.log(result); 
    
            res.status(201).json({
                message: 'Successfully added a new quote',
                quote: {
                    _id: result._id,
                    projectTotal: result.projectTotal, 
                    header: result.header, 
                    to_title: result.to_title, 
                    logo: result.logo,
                    from: result.from,     
                    to: result.to,
                    date: result.date,
                    currency: result.currency,
                    number: result.number,   
                    payment_terms: result.payment_terms,   
                    items: result.items, 
                    fields: result.fields,
                    tax: result.tax,
                    discounts: result.discounts,
                    shipping: result.shipping,
                    notes: result.notes,
                    terms: result.terms,
                    quotePDFpath: pdfPath
                }
            });
    
        }).catch(function(err) {
            console.log(err); 
    
            res.status(500).json({
                message: "Failed to POST quote object", 
                error: err
            });
        });

    }, function(error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to generate PDF", 
            error: err
        }); 
    });

}

function generateInvoice(invoice, filename, success, error) {
    var postData = JSON.stringify(invoice);
    var options = {
        hostname  : "invoice-generator.com",
        port      : 443,
        path      : "/",
        method    : "POST",
        headers   : {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(postData)
        }
    };

    var file = fs.createWriteStream("uploads/"+filename);

    var req = https.request(options, function(res) {
        res.on('data', function(chunk) {
            file.write(chunk);
        })
        .on('end', function() {
            file.end();

            if (typeof success === 'function') {
                success();
            }
        });
    });
    req.write(postData);
    req.end();

    if (typeof error === 'function') {
        req.on('error', error);
    }
}
