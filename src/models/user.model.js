// importing modules
const mongoose = require("mongoose");
const randomstring = require("randomstring");

// user schema setup
const userSchema = new mongoose.Schema({

    names: {
        type: String
    },

    username: {
        type: String
    },

    email: {
        type: String
    },

    image: {
        type: String
    },

    password: {
        type: String
    },

    userCode: {
        type: String,
        default: randomstring.generate({
            charset: "numeric",
            length: 6
        })
    }

},  { timestamps: true });

// user model
const User = mongoose.model("User", userSchema);

// exporting user model.
module.exports = User;