const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// let moment = require("moment");
const courseSchema = new Schema({
	name: { type: String, unique: true, required: true },
	description: { type: String, required: true, trim: true },
	createdAt: {
		type: Date,
		// default: moment().format("MMM Do YY"), // Jun 24th 21
		default: Date.now,
	},
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
