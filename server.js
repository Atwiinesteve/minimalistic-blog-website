// importing modules
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

// importing configs
require("dotenv").config();

// importing database connection settings
require("./src/database/db.connections");

// application initialization
const app = express();
const PORT = process.env.PORT || 3000;

// cors options
const corsOptions = {
	origin: [
		"http://localhost:8080",
		"http://localhost:8000",
		"http://localhost:3000"
	],
  methods: [ "POST", "GET", "PUT", "PATCH", "DELETE" ]
};

// middlewares initialization
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// serving static content.
app.use(express.static(path.join(__dirname, "/src/public")));
app.use(express.static(path.join(__dirname, "uploads/")));
app.use(express.static(path.join(__dirname, "views/")));

// views engine setup
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "./src/views"))

// routes setup
app.use("/api", require("./src/routes/users.route")); // users
app.use("/api", require("./src/routes/blogs.route")); // blogs

// servver initialization
app.listen(PORT, function(request, response) {
	console.log(`Server Application Running on Port http://localhost:${PORT}`);
})