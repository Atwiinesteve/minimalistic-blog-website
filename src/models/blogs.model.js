// importing modules
const mongoose = require("mongoose");

// user schema setup
const blogSchema = new mongoose.Schema(
	{
		title: {
			type: String,
		},

		image: {
			type: String,
		},

		content: {
			type: String,
		},

		author: {
			type: String,
		},
	},
	{ timestamps: true },
);

// user model
const Blog = mongoose.model("Blog", blogSchema);

// exporting user model.
module.exports = Blog;
