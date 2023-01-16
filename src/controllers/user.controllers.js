// importing modules
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");

// importing configs
require("dotenv").config();

// importing user model
const User = require("../models/user.model");

// files upload setup
const store = multer.diskStorage({
    destination: function(request, file, cb) {
        cb(null, path.join(__dirname, "../uploads"));
    },
    filename: function(request, file, cb) {
        cb(null, file.fieldname + "--" + Date.now() + "--" + file.originalname);
    }
});
const uploads = multer({
    storage: store
});

// register page 
function registerPage(request, response) {
    try {
        return response.render('register', { title: "Register User"})
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

// login page 
function loginPage(request, response) {
    try {
        return response.render('login', { title: "User Login"})
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

// user dashboard
function dashboard (request, response) {
    try {
        return response.render('dashboard', { title: 'User Dashboard ' })
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

// get all users
async function getAllUsers (request, response) {
    try {
        const users = await User.find();
        if(users.length === 0) {
            return response.status(404).json({ message: "No Users were currently found.." })
        } else {
            return response.status(200).json(users);
        }
    } catch (error) {
        console.log({
            name: error.name,
            message: error.message,
            stack: error.stack
        });
        return response.status(500).json({message: "Server Under Maintenaince. Please try again later.."});
    }
};

// register user
async function registerUser (request, response) {
    try {
        const userAlreadyExists = await User.findOne({ email: request.body.email });
        if(userAlreadyExists) {
            return response.status(400).json({ message: `User with email ${userAlreadyExists.email} already exists..` })
        } else {
            const salt = await bcrypt.genSalt(16);
            const hash = await bcrypt.hash(request.body.password, salt);
            const user = new User({
                names: request.body.names,
                email: request.body.email,
                username: request.body.username,
                image: request.file.filename,
                password: hash
            });
            user.save()
                .then((user) => { return response.status(201).redirect("/api/login"); })
                .catch((error) => {
                    console.log({
                        name: error.name,
                        message: error.message,
                        stack: error.stack,
                    });
                    return response.status(500).json({ message: "Server Under Maintenaince. Please try again later.."});
                })
        }
    } catch (error) {
        console.log({
            name: error.name,
            message: error.message,
            stack: error.stack,
        });
        return response.status(500).json({ message: "Server Under Maintenaince. Please try again later.." });
    }
};

// login user
async function loginUser (request, response) {
    try {
        const userExists = await User.findOne({ email: request.body.email });
        if(!userExists) {
            return response.status(404).json({ message: `User with Email Address ${userExists.email} does not exist. Please register and try again..` })
        } else {
            const validPassword = await bcrypt.compare(request.body.password, userExists.password);
            if(!validPassword) {
                return response.status(400).json({ message: `Invalid Email/Password..`})
            } else {
                const maxAge = 1*24*60*60;
                const token = jwt.sign({ _id: userExists._id }, process.env.SECRET_TOKEN, { expiresIn: maxAge } );
                response.cookie("token", token, { httpOnly: true, secure: true, samesite: true, maxAge: maxAge });
                response.redirect("/api/dashboard");
            }
        }
    } catch (error) {
        console.log({
            name: error.name,
            message: error.message,
            stack: error.stack,
        });
        return response.status(500).json({ message: "Server Under Maintenaince. Please try again later.." });
    }
}

// logout users
function logoutUser (request, response) {
    try {
        response.cookie("token", "", { maxAge: -0.111 });
        return response.redirect("/api/login");
    } catch (error) {
        console.log({
            name: error.name,
            message: error.message,
            stack: error.stack,
        });
        return response.status(500).json({ message: "Server Under Maintenaince. Please try again later.."})
    }
}

// exporting user controllers
module.exports = {
    uploads,
    registerPage,
    loginPage,
    dashboard,
    getAllUsers,
    registerUser,
    loginUser,
    logoutUser
}