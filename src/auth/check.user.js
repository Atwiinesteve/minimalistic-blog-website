// importing modules.
const jwt = require("jsonwebtoken");

// importing configs
require("dotenv").config();

// user model.
const User = require("../models/user.model");

// check user token
function checkUser (request, response, next) {
    try {
        const token = request.cookies.token;
        if(token) {
            jwt.verify(
                token,
                process.env.SECRET_TOKEN,
                async (error, decoded) => {
                    if(error) {
                        response.locals.user = null;
                        console.log({ message: error.message });
                        next();
                    } else {
                        const user = await User.findById(decoded._id);
                        response.locals.user = user;
                        next();
                    }
                }
            )
        } else {
            response.locals.user = null;
            next();
        }
    } catch (error) {
        console.log({
            name: error.name,
            message: error.message,
            stack: error.stack,
        });
        return response
            .status(500)
            .json({
                message: "Server Under Maintenaince. Please try again later..",
            });
    }
};

// exports
module.exports = { checkUser };