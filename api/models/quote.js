
var mongoose = require('mongoose'); 

var quoteSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    projectId: { type: String, required: true }, 
    projectTotal: { type: Number, required: true }, 
    createDate: { type: Date, required: true },
    invoice_number_title: { type: String, default: "" },   //default used to be "#"
    balance_title: { type: String, default: "Grand Total" },
    item_header: { type: String, default: "Description" },
    header: { type: String, default: "ESTIMATE" }, //document title 
    to_title: { type: String, default: "Customer Details" }, //client header
    logo: { type: String, required: false },
    from: { type: String, required: true },     //"Invoiced\n701 Brazos St\nAustin, TX 78748"   (name is bold, after first line, no longer bold)
    to: { type: String, required: true },
    //date: null value means current date is used
    currency: { type: String, default: "usd" },
    // number: { type: String, required: true },   //"INV-0001"
    payment_terms: { type: String, required: false },    //"Auto-Billed - Do Not Pay" (under the 'Date')
    items: [mongoose.Schema.Types.Mixed], 
    // [        //the items array should be of this 
    //     {
    //         name: "Subscription to Starter",
    //         quantity: 1,
    //         unit_cost: 50,
    //         description: "The best gizmos there are around."     (this is optional)
    //     }
    // ]
    fields: {  //can be null, then won't add any fields but use defaults; tax, discounts, and shipping
        tax: { type: String, default: "%"},     //will not display unless you specify a value
        discounts: { type: Boolean, default: false },
        shipping: { type: Boolean, default: false }
    },
    tax: { type: Number, required: false },     
    discounts: { type: Number, required: false },
    shipping: { type: Number, required: false },
    notes: { type: String, required: false },
    terms: { type: String, required: false },
    quotePDFpath: {type: String, required: true}
});

module.exports = mongoose.model('Quote', quoteSchema); 