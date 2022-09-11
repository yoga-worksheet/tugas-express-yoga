const connection = require("../../config/mysql");
const fs = require("fs");
const path = require("path");

const index = (req, res) => {
	const { search } = req.query;
	let query = {
		sql: "SELECT * FROM products",
	};
	if (search) {
		query = {
			sql: "SELECT * FROM products WHERE name LIKE ?",
			values: [`%${search}%`],
		};
	}
	connection.query(query, _response(res));
};

const view = (req, res) => {
	const { id } = req.params;
	connection.query(
		{
			sql: "SELECT * FROM products WHERE id = ?",
			values: [id],
		},
		_response(res)
	);
};

const store = (req, res) => {
	const { users_id, name, price, stock, status } = req.body;
	const image = req.file;
	if (image) {
		const target = path.join(
			__dirname,
			"../../uploads",
			image.originalname
		);
		fs.renameSync(image.path, target);
		connection.query(
			{
				sql: "INSERT INTO products (users_id, name, price, stock, status, image_url) VALUES (?, ?, ?, ?, ?, ?)",
				values: [
					users_id,
					name,
					price,
					stock,
					status,
					`${req.hostname}/public/${image.originalname}`,
				],
			},
			_response(res)
		);
	}
};

const update = (req, res) => {
	const { users_id, name, price, stock, status } = req.body;
	const { id } = req.params;
	const image = req.file;
	let imageUpdate = "";
	if (image) {
		const target = path.join(
			__dirname,
			"../../uploads",
			image.originalname
		);
		fs.renameSync(image.path, target);
		imageUpdate = `, image_url = '${req.hostname}/public/${image.originalname}'`;
	}
	connection.query(
		{
			sql: `UPDATE products SET users_id = ?, name = ?, price = ?, stock = ?, status = ?${imageUpdate} WHERE id = ?`,
			values: [users_id, name, price, stock, status, id],
		},
		_response(res)
	);
};

const destroy = (req, res) => {
	const { id } = req.params;
	connection.query(
		{
			sql: `DELETE FROM products WHERE id = ?`,
			values: [id],
		},
		_response(res)
	);
};

const _response = (res) => {
	return (error, result) => {
		if (error) {
			res.send({
				status: "failed",
				response: "failed to fetch",
				message: error,
			});
		} else {
			res.send({
				status: "success",
				response: result,
			});
		}
	};
};

module.exports = {
	index,
	view,
	store,
	update,
	destroy,
};
