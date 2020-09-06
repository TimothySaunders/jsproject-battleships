// Imports
const express = require("express");
const ObjectID = require("mongodb").ObjectID;

// Create router function
const createRouter = function(collection) {
    
    // Create router
    const router = express.Router();

    // Routes

    // GET - index
    router.get("/", (req, res) => {
        
        // Run request
        collection.find().toArray()
        .then(docs => res.json(docs))
        .catch((error) => {
            console.error(error);
            res.status(500);
            res.json({status: 500, msg: "Server Error - GET:index", error: error});
        });

    });

    // POST - create (index)
    router.post("/", (req, res) => {

        // Grab the request body
        const game = req.body;

        // Run request
        collection.insertOne(game)
        .then(response => res.json(response.ops[0]))
        .catch((error) => {
            console.error(error);
            res.status(500);
            res.json({status: 500, msg: "Server Error - POST:index", error: error});
        });

    });

    // PUT - update
    router.put("/:id", (req, res) => {

        // Grab URL params && request body
        const id = ObjectID(req.params.id);
        const game = req.body;

        // Run request
        collection.findOneAndUpdate({_id: id}, {$set: game}, {returnOriginal: false})
        .then(result => res.json(result.value))
        .catch((error) => {
            console.error(error);
            res.status(500);
            res.json({status: 500, msg: "Server Error - PUT:id", error: error});
        });

    });

    // GET - single
    router.get("/:id", (req, res) => {
        
        // Grab URL params && request body
        const id = ObjectID(req.params.id);

        // Run request
        collection.findOne({_id: id})
        .then(doc => res.json(doc))
        .catch((error) => {
            console.error(error);
            res.status(500);
            res.json({status: 500, msg: "Server Error - PUT:id", error: error});
        });
    });

    // Return router
    return router;

}

// Export the router
module.exports = createRouter;