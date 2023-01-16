// importing modules
const mongoose = require("mongoose");

// importing configs
require("dotenv").config();

// database connection settings
module.exports = mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (error) => {
    if(error) new Error("Database Connection Failed: " + error.message);
    console.log("Database Connection Successfully Established..")
});