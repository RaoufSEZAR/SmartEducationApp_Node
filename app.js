const express = require("express");
const mongoose = require("mongoose");

const pageRoute = require("./routes/pageRoutes");
const courseRoute = require("./routes/courseRoutes");
const categoryRoute = require("./routes/categoryRoutes");
const userRoute = require("./routes/userRoutes");

const app = express();

//connect DB
mongoose
	.connect("mongodb://localhost:27017/smartEducation", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("connected to db sccessfully");
	})
	.catch((err) => {
		console.log(err);
	});

// Template engine
app.set("view engine", "ejs");

//middlewares
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//ROUTES
app.use("/", pageRoute);
app.use("/courses", courseRoute);
app.use("/categories", categoryRoute);
app.use("/users", userRoute);

const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
