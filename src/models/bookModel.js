const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema( {
    bookName: String, 
    authorName: String, 
    tags: [String],
    
    isPublished: Boolean,
    prices: {
        indianPrice: String,
        europePrice: String,
    },
    sales: {type: Number, default: 10}
}, { timestamps: true });


module.exports = mongoose.model('Book', bookSchema) //users

// type od Validation ----- :
            //require:true  (means should not be empaty)
            //unique
            // default - defult vale


// type of data type  ---- :      
            //String 
            //Number
            //Date- date.now
            //Boolean
            // Arrays
            // Object
            // ObjectId
           // Buffer - not cover
