const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const methodOverride = require("method-override");
const pageRoute = require("./routes/pageRoutes");
const courseRoute = require("./routes/courseRoutes");
const categoryRoute = require("./routes/categoryRoutes");
const userRoute = require("./routes/userRoutes");

const app = express();

//connect DB
mongoose
	.connect(
		"mongodb+srv://raoufsato:raoufsato@cluster0.ihfi0.mongodb.net/smartEducation?retryWrites=true&w=majority?authSource=smartEducation=1",
		{
			useNewUrlParser: true,
			useFindAndModify: false,
			useUnifiedTopology: true,
		}
	)
	.then(() => {
		console.log("connected to db sccessfully");
		console.log(process.env.PORT);
	})
	.catch((err) => {
		console.log(err);
	});

// Template engine
app.set("view engine", "ejs");

//Global veriable
global.userIn = null;

//middlewares
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	session({
		secret: "keyboard cat",
		resave: false,
		saveUninitialized: true,
		store: MongoStore.create({
			mongoUrl:
				"mongodb+srv://raoufsato:raoufsato@cluster0.ihfi0.mongodb.net/smartEducation?retryWrites=true&w=majority?authSource=smartEducation=1",
		}),
	})
);
app.use(flash());
app.use((req, res, next) => {
	res.locals.flashMessages = req.flash();
	next();
});
app.use(
	methodOverride("_method", {
		methods: ["POST", "GET"],
	})
);

//ROUTES
app.use("*", (req, res, next) => {
	userIn = req.session.userID;
	next();
});
app.use("/", pageRoute);
app.use("/courses", courseRoute);
app.use("/categories", categoryRoute);
app.use("/users", userRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
