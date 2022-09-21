const db = require("../../config/mongodb");
const path = require("path");
const fs = require("fs");
const { ObjectId } = require("mongodb");
const Product = db.collection("products");

const index = async (req, res) => {
	const {search} = req.query;
	let query = {};
	try {
		if (search) query = { $text: { $search : search }};
		const result = await Product.find(query).toArray();
		_response(res, "success", result);
	} catch (error) {
		_response(res, "error", error.message);
	}
};

const view = async (req, res) => {
	const {id} = req.params;
	try {
		const result = await Product.findOne({_id : ObjectId(id)});
		_response(res, "success", result);
	} catch (error) {
		_response(res, "error", error.message);
	}
}

const store = async (req, res) => {
	const { name, price, stock, status } = req.body;
	const image = req.file;
	if(image) {
		const target = path.join(
			__dirname,
			"../../uploads",
			image.originalname
		);
		fs.renameSync(image.path, target);
		try {
			const result = await Product.insertOne({
				name,
				price,
				stock,
				status,
				image_url: `${req.hostname}/public/${image.originalname}`,
			});
			_response(res, "success", `document inserted with _id:${result.insertedId}`);
		} catch (error) {
			_response(res, "error", error.message);
		}
	} else {
		_response(res, "error", "Must input an image");
	}
}

const update = async (req, res) => {
	const { name, price, stock, status } = req.body;
	const { id } = req.params;
	const image = req.file;
	let fieldUpdate = {
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
		const result = await Product.updateOne({_id: ObjectId(id)}, {$set : fieldUpdate});
		if (result) {
			_response(res, "success", result);
		} else {
			throw new Error("Product not Found");
		}
	} catch (error) {
		_response(res, "error", error.message);
	}
}

const destroy = async (req, res) => {
	const {id} = req.params;
	try {
		const result = await Product.deleteOne({_id: ObjectId(id)});
		_response(res, "success", result);
	} catch (error) {
		_response(res, "error", error.message);
	}
}

const _response = (res, status, response) => {
	res.send({ status, response });
};

module.exports = {
	index,
	store,
	view,
	update,
	destroy
};
