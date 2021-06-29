const User = require("../models/User");
const Course = require("../models/Course");
const Category = require("../models/Category");
const { validationResult } = require("express-validator");

const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
	try {
		const user = await User.create(req.body);
		res.status(201).redirect("/login");
	} catch (error) {
		const errors = validationResult(req);

		for (let i = 0; i < errors.array().length; i++) {
			req.flash("error", `${errors.array()[i].msg}`);
		}

		res.status(400).redirect("/register");
	}
};

exports.loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		await User.findOne({ email }, (err, user) => {
			if (user) {
				bcrypt.compare(password, user.password, (err, same) => {
					if (same) {
						// USER SESSION
						req.session.userID = user._id;
						res.status(200).redirect("/users/dashboard");
					} else {
						req.flash("error", "Your password is not correct!");
						res.status(400).redirect("/login");
					}
				});
			} else {
				req.flash("error", "User is not exist!");
				res.status(400).redirect("/login");
			}
		});
	} catch (error) {
		res.status(400).json({ status: "fail", error });
	}
};

exports.logoutUser = async (req, res) => {
	req.session.destroy(() => {
		res.redirect("/");
	});
};

exports.getDashboardPage = async (req, res) => {
	const user = await User.findOne({ _id: req.session.userID }).populate(
		"courses"
	);
	const categories = await Category.find();
	const courses = await Course.find({ user: req.session.userID });
	const users = await User.find();
	console.log(users.countDocument);
	res.status(200).render("dashboard", {
		page_name: "dashboard",
		user,
		categories,
		courses,
		users,
	});
};
