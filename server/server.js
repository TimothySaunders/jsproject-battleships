// Imports
const express = require("express");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
const createRouter = require("./helpers/create_router.js");

// Create server

const app = express();

// APP use

app.use(cors());
app.use(bodyParser());

// Connect to MongoDB
MongoClient.connect("mongodb://localhost:27017")
.then((client) => {
    // Get connection details
    const db = client.db("battleships_save_data");
    const bsCollection = db.collection("battleship_save");
    const bsRouter = createRouter(bsCollection);

    // Router
    app.use("/api/game", bsRouter);
})
.catch(console.error);

// Run express server
app.listen(3000, () => {
    console.log("Express server running:", true);
    console.log("Port:", 3000);
});