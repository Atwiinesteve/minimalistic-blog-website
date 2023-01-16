// importing modules
const express = require("express");
const multer = require("multer");
const path = require("path");

// importing configs
require("dotenv").config();

// importing user model
const Blog = require("../models/blogs.model");

// files upload setup
const store = multer.diskStorage({
	destination: function (request, file, cb) {
		cb(null, path.join(__dirname, "../uploads"));
	},
	filename: function (request, file, cb) {
		cb(null, file.fieldname + "--" + Date.now() + "--" + file.originalname);
	},
});
const uploads = multer({
	storage: store,
});

// home page
function homePage (request, response) {
    try {
        return response.render("index", { title: "Blogs App" })
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

// get all blogs
async function getAllBlogs (request, response) {
	try {
		const blogs = await Blog.find();
		if (blogs.length === 0) {
			return response
				.status(404).render("blogs", { message: "No blogs were currently found.." });
				// .json({ message: "No blogs were currently found.." });
		} else {
			return response.render("blogs", { blogs: blogs });
		}
	} catch (error) {
		console.log({
			name: error.name,
			message: error.message,
			stack: error.stack,
		});
		return response
			.status(500)
			.json({ message: "Server Under Maintenaince. Please try again later.." });
	}
};

// get blog by id
async function getBlogById (request, response) {
    try {
        const blogId = request.params.id;
        const blog = await Blog.findById(blogId);
        if(!blog) {
            return response.status(404).json({ message: `No Blog was Found..` })
        } else {
            return response.status(200).json(blog);
        }
    } catch (error) {
        console.log({
            name: error.name,
            message: error.message,
            stack: error.stack,
        });
        return response.status(500).json({
            message: "Server Under Maintenaince. Please try again later..",
        });
    }
}

// create blog
async function createBlog (request, response) {
	try {
        const blog = new Blog({
            title: request.body.title,
            image: request.files.filename,
            content: request.body.content,
            author: request.body.author
        });
        blog
            .save()
            .then((blog) => {
                return response.status(201).json(blog);
            })
            .catch((error) => {
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
            });
		
	} catch (error) {
		console.log({
			name: error.name,
			message: error.message,
			stack: error.stack,
		});
		return response
			.status(500)
			.json({ message: "Server Under Maintenaince. Please try again later.." });
	}
};

// update blog by id
async function updateBlog (request, response) {
    try {
        const blogId = request.params.id;
        const updatedBlog = await Blog.findByIdAndUpdate(blogId, { ...request.body })
        if(!updatedBlog) {
            return response.status(400).json({ message: "Blog not updated.." })
        } else {
            return response.status(200).json({ message: "Blog Successfully updated.." })
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
}

// delete blog by id
async function deleteBlog (request, response) {
    try {
        const blogId = request.params.id;
        const blog = await Blog.findByIdAndDelete(blogId);
        if(!blog) {
            return response.status(404).json({ message: "No Blog was found.." })
        } else {
            return response.status(200).json({ message: "Blog Successfully Deleted.." })
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
}


	

// exporting user controllers
module.exports = {
	uploads,
    homePage,
	getAllBlogs,
    getBlogById,
	createBlog,
    updateBlog,
    deleteBlog
};
