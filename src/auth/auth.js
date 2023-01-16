// importing modules
const jwt = require("jsonwebtoken");

// importing configs
require("dotenv").config();

// auth controller
function auth (request, response, next) {
    try {
        const token = request.cookies.token;
        if(token) {
            jwt.verify(
                token,
                process.env.SECRET_TOKEN,
                (error) => {
                    if(error) {
                        response.redirect("/api/login");
                        console.log({
                            name: error.name,
                            message: error.message,
                            stack: error.stack,
                        });
                        next()
                    } else {
                        next()
                    }
                }
                )
            } else {
                response.redirect("/api/login")
        }
    } catch (error) {
        console.log({
            name: error.name,
            message: error.message,
            stack: error.stack
        })
    }
};

// exporting auth controller
module.exports = { auth };