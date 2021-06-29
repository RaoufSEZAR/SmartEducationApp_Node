const express = require("express");
const { body } = require("express-validator");
const User = require("../models/User");

const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/signup").post(
	[
		body("name").not().isEmpty().withMessage("Please Enter Your Name"),

		body("email")
			.isEmail()
			.withMessage("Please Enter Valid Email")
			.custom((userEmail) => {
				return User.findOne({ email: userEmail }).then((user) => {
					if (user) {
						return Promise.reject("Email is already exists!");
					}
				});
			}),

		body("password").not().isEmpty().withMessage("Please Enter A Password"),
	],
	authController.createUser
);
router.route("/login").post(authController.loginUser);
router.route("/logout").get(authController.logoutUser);
router.route("/dashboard").get(authMiddleware, authController.getDashboardPage);

module.exports = router;
