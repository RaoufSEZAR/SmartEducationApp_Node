const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const slugify = require("slugify");

const categorySchema = new Schema({
	name: { type: String, unique: true, required: true },
	slug: { type: String, unique: true },
});

categorySchema.pre("validate", function (next) {
	this.slug = slugify(this.name, { lower: true, strict: true });
	next();
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
