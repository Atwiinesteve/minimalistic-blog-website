// importing modules.
const express = require("express");

// router setup
const router = express.Router();

// importing user controllers
const { 
    uploads, 
    getAllBlogs, 
    createBlog,
    getBlogById,
    deleteBlog,
    updateBlog,
    homePage,

} = require("../controllers/blog.controllers");

// GET METHOD
router.get("/home", homePage);
router.get("/blogs", getAllBlogs);
router.get("/blogs/:id", getBlogById);

// POST METHOD
router.post("/create-blog", uploads.single("image"), createBlog);

// UPDATE METHOD
router.patch("/update-blog/:id", uploads.single("image"), updateBlog);

// DELETE METHOD
router.delete("/delete-blog/:id", deleteBlog);

// exporting  route.
module.exports = router;
