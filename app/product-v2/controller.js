const sequelize = require("../../config/sequelize");
const Product = require("./model");
const path = require("path");
const fs = require("fs");

const index = async (req, res) => {
	const { search } = req.query;
	let query = "SELECT * FROM products";
	if (search) {
		query = `SELECT * FROM products WHERE name LIKE %${search}%`;
	}
	try {
		const [result] = await sequelize.query(query);
		_response(res, "success", result);
	} catch (error) {
		_response(res, "error", error.message);
	}
};

const view = async (req, res) => {
	const { id } = req.params;
	try {
		const result = await Product.findOne({ where: { id } });
		if (result) {
			_response(res, "success", result);
		} else {
			throw new Error("Product not found");
		}
	} catch (error) {
		_response(res, "error", error.message);
	}
};

const store = async (req, res) => {
	const { users_id, name, price, stock, status } = req.body;
	const image = req.file;
	if (image) {
		const target = path.join(
			__dirname,
			"../../uploads",
			image.originalname
		);
		fs.renameSync(image.path, target);
		try {
			const result = await Product.create({
				users_id,
				name,
				price,
				stock,
				status,
				image_url: `${req.hostname}/public/${image.originalname}`,
			});
			_response(res, "success", result);
		} catch (error) {
			_response(res, "error", error.message);
		}
	} else {
		_response(res, "error", "Must input an image");
	}
};

const update = async (req, res) => {
	const { users_id, name, price, stock, status } = req.body;
	const { id } = req.params;
	const image = req.file;
	let fieldUpdate = {
		users_id,
		name,
		price,
		stock,
		status,
	};
	if (image) {
		const target = path.join(
			__dirname,
			"../../uploads",
			image.originalname
		);
		fs.renameSync(image.path, target);
		fieldUpdate.image_url = `${req.hostname}/public/${image.originalname}`;
	}
	try {
		const result = await Product.update(fieldUpdate, { where: { id } });
		if (result) {
			_response(res, "success", "Product updated");
		} else {
			throw new Error("Product not Found");
		}
	} catch (error) {
		_response(res, "error", error.message);
	}
};

const destroy = async (req, res) => {
	const { id } = req.params;
	try {
		const result = await Product.destroy({ where: { id } });
		if (result) {
			_response(res, "success", "Product deleted");
		} else {
			throw new Error("Product not Found");
		}
	} catch (error) {
		_response(res, "error", error.message);
	}
};

const _response = (res, status, response) => {
	res.send({ status, response });
};

module.exports = {
	index,
	view,
	store,
	update,
	destroy,
};
