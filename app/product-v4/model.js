const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, `name can't be empty`],
		minlength: 3,
		maxlength: 50,
	},
	price: {
		type: Number,
		required: true,
		min: 1000,
		max: 999999999,
	},
	stock: Number,
	status: {
		type: Boolean,
		default: true,
	},
	image_url: {
		type: String,
	},
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
