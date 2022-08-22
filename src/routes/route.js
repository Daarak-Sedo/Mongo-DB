const express = require('express');
const router = express.Router();

const { createAuthor,getAuthorsData} = require("../controllers/authorController");
const createPublisher = require("../controllers/publisherController");
const { createBook, getBooksWithAuthorDetails,getBooksData  } = require("../controllers/bookController");

// inserting the data in their respective Model.
router.post("/createAuthor", createAuthor);
router.post("/createPublisher", createPublisher);
router.post("/createBook", createBook);

// geting the data according to ask of questions.
router.get("/getBooksData", getBooksData);
router.get("/getAuthorsData",getAuthorsData);

// Updating some feilds of the data in D B.
router.put("/getBooksWithAuthorDetails", getBooksWithAuthorDetails);

module.exports = router;