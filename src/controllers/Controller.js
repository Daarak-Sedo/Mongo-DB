const authorModel = require("../models/authorModel")
const bookModel = require("../models/bookModel")

// DATA: --
// .   CRUD operations -   Write API's to do the following --- 
//     Write create APIs for both books and authors ---> If author_id is not available then do not accept the entry(in neither the author collection nor the books collection)
//     _id: ObjectId("8781263871293"), _id will be automatically generated

// Authors:

// {
//     author_id: 1,
//         author_name: "Chetan Bhagat",
//             age: 25,
//                 address: "New delhi"
// } ,
// {
//     author_id: 2,
//         author_name: "J.k Rowling",
//             age: 60,
//                 address: "Britain"
// } ,
// {
//     author_id: 3,
//         author_name: "Ramanujan",
//             age: 100,
//                 address: "Tamilnadu"
// }


// Books:
// {
//     name: "Two states",
//         author_id: 1,
//             price: 50,
//                 ratings: 4.5,
//     } ,
// {
//     name: "Five Point Someone",
//         author_id: 1,
//             price: 50,
//                 ratings: 4.5,
//     } ,
// {
//     name: "The 3 Mistakes of My Life",
//         author_id: 1,
//             price: 50,
//                 ratings: 4.5,
//     } ,
// {
//     name: "One Arranged Murder",
//         author_id: 1,
//             price: 50,
//                 ratings: 4.5,
//     } ,
// {
//     name: "Harry Porter",
//         author_id: 2,
//             price: 50,
//                 ratings: 4.5,
//     } ,
// {
//     name: "Harry Porter",
//         author_id: 2,
//             price: 50,
//                 ratings: 4.5,
//     }


//  Problem 1--
//            Write down the schemas for book and authors (keeping the data given below in  mind). Also create the documents (corresponding to the data given below) in your database.

const createAuthors = async function (req, res) {
    let data = req.body;
    let savedData = await authorModel.create(data);
    res.send({ msg: savedData });
}

const createBooks = async function (req, res) {
    let data = req.body;
    let savedData = await bookModel.create(data);
    res.send({ msg: savedData });
}


// Problem 2 --  
//         List out the books written by "Chetan Bhagat" ( this will need 2 DB queries one after another- first query will find the author_id for "Chetan Bhagat”. Then next query will get the list of books with that author_id )

const getBooksList = async function (req, res) {
    let authordetails = await authorModel.find({ author_name: "Chetan Bhagat" });
    let authorId = authordetails[0].author_id;
    let allBooks = await bookModel.find({ author_id: authorId }).select({ bookName: 1, _id: 0 });

    res.send({ msg: allBooks });
}


// Problem 3 --
//     find the author of “Two states” and update the book price to 100;  Send back the author_name and updated price in response.  ( This will also need 2  queries- 1st will be a findOneAndUpdate. The second will be a find query aith author_id from previous query)

const getNewBookPrice = async function (req, res) {
    const bookDetails = await bookModel.find({ name: "Two states" })
    const authorId = bookDetails[0].author_id;
    const authorName = await authorModel.find({ author_id: authorId }).select({ author_name: 1, _id: 0 })

    const book_name = bookDetails[0].name
    const newPrice = await bookModel.findOneAndUpdate({ name: book_name }, { price: 100 }, { new: true }).select({ price: 1, _id: 0 })

    res.send({ msg: { authorName, newPrice } })
}


// Problem 4 --
//    Find the books which costs between 50-100(50,100 inclusive) and respond back with the    author names of respective books.. 
//     bookModel.find( { price : { $gte: 50}  ,  price: {$lte: 100} } ) // WRONG
//     bookModel.find( { price : { $gte: 50, $lte: 100} } ).select({ author_id :1})..run a map (or forEach) loop and get all the authorName corresponding to the authorId’s ( by querying authorModel)

const getAuthorsName = async function (req, res) {
    const booksId = await bookModel.find({ price: { $gte: 50, $lte: 100 } }).select({ author_id: 1, _id: 0 })
    const id = booksId.map(inp => inp.author_id)
    console.log(id)
    let temp = []
    for (let i = 0; i < id.length; i++) {
        const author = await authorModel.find({ author_id: id[i] }).select({ author_name: 1, _id: 0 })
        temp.push(author)
    }
    const authorName = temp.flat()
    res.send({ authorName })
}


module.exports = { createAuthors, createBooks, getBooksList, getNewBookPrice, getAuthorsName };