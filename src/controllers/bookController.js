const authorModel = require("../models/authorModel")
const bookModel = require("../models/bookModel")
const mongoose = require('mongoose');
const publisherModel = require("../models/publisherModel");

const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId);
};

// Problem 3 -   Write a POST api that creates a book from the details in the request body. The api takes both the author and publisher from the request body. 
// In this api, you have to write a logic that validates the following -- :

// The authorId is present in the request body. If absent send an error message that this detail is required
// If present, make sure the authorId is a valid ObjectId in the author collection. If not then send an error message that the author is not present.
// The publisherId is present in the request body. If absent send an error message that this detail is required
// If present, make sure the publisherId is a valid ObjectId in the publisher collection. If not then send an error message that the publisher is not present.

const createBook = async function (req, res) {
    let book = req.body;
   let { author_id, publisher_id } = book;
   
    if (!author_id || !publisher_id) {
        return res.send("ID is required")
    }
         // we can write it by 2 type - 
             // let isValid = mongoose.Types.ObjectId.isValid(author1)
   
    if (!isValidObjectId(author_id)) {
        return res.send({ status: false, message: "Author is not present" });
    }
    if (!isValidObjectId(publisher_id)) {
        return res.send({ status: false, message: "Publisher is not present" });
    }

    let bookCreated = await bookModel.create(book)
    return res.send({ data: bookCreated })
}

   
// Problem 4 -  Write a GET api that fetches all the books along with their author details (you have to populate for this) as well the publisher details (you have to populate for this) 

const getBooksData = async function (req, res) {
    let books =  await bookModel.find().populate(['author_id', 'publisher_id'])    
   res.send({ data: books })
}
 // Populate- is used to fetch fata from another obj , after fetching it Set data in same obj 


//Problem 5 -  Create at least 4 publishers (Penguin, Bloomsbury, Saraswati House, HarperCollins). Create at least 6 authors with ratings 2, 3, 3.5, 4, 4.5 and 5. Create around 10 books with these publishers and authors.

   // Create a new PUT api /books and perform the following two operations --
//a-- Add a new boolean attribute in the book schema called isHardCover with a default false value. For the books published by 'Penguin' and 'HarperCollins', update this key to true.


const getBooksWithAuthorDetails = async function (req, res) {
   
    let data =   await publisherModel.find({name : ["Penguin","HarperCollins"]}).select({_id : 1})
    //   We Can Write also --   await publisherModel.find({$or: [{name : "Penguin"}, {name : "HarperCollins"}]}).select({_id:1});
    let bookid = await bookModel.updateMany({ publisher : data },{ $set : {isHardCover : true , new : true }},{upsert : true})
    // await bookModel.updateMany({$or: [{publisher_id: pub_id[0]._id }, {publisher_id: pub_id[1]._id}]}, { $set: { isHardCover: false } }



// b-- For the books written by authors having a rating greater than 3.5, update the books price by 10 (For eg if old price for such a book is 50, new will be 60) 
    let authorIds = await authorModel.find( { ratings : { $gt : 3.5 }}).select({_id : 1})
    let rating1 = await bookModel.updateMany({author : authorIds }, { $inc : {price :10 }},{upsert : true})
 
    res.send({ data: bookid , rating1})
  }

  module.exports = { createBook, getBooksWithAuthorDetails, getBooksData };