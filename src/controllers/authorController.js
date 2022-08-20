const AuthorModel = require("../models/authorModel")


// Probelm 1. Write a POST api that creates an author from the details in request body

const createAuthor = async function (req, res) {
    let data = req.body;
    let author = await AuthorModel.create(data);
    return res.send({ author });
}

const getAuthorsData = async function (req, res) {
    let authors = await AuthorModel.find()
    return res.send({ data: authors })
}

module.exports = { createAuthor, getAuthorsData };