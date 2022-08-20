const publisherModel = require("../models/publisherModel");


// 2. Write a POST api that creates a publisher from the details in the request body

const createPublisher = async function (req, res) {
    const data = req.body;
    const publisher = await publisherModel.create(data);
    res.send({ publisher });
}

module.exports = createPublisher;