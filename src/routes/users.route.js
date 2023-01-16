// importing modules.
const express = require("express");

// router setup
const router = express.Router();

// importing user controllers
const { 
    getAllUsers, 
    logoutUser,
    registerUser,
    uploads,
    loginUser,
    registerPage,
    loginPage,
    dashboard,
    
} = require("../controllers/user.controllers");
const { homePage } = require("../controllers/blog.controllers");

// importing auth controllers
const { checkUser } = require("../auth/check.user");
const { auth } = require("../auth/auth");

// GET METHOD
router.get("*", checkUser);
router.get("/home", homePage)
router.get("/users", getAllUsers);
router.get("/logout", logoutUser);
router.get("/register", registerPage);
router.get("/login", loginPage);
router.get("/dashboard", auth, dashboard);

// POST METHOD
router.post("/register", uploads.single("image") ,registerUser);
router.post("/login", loginUser);

// exporting  route.
module.exports = router;