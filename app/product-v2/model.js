const { DataTypes } = require("sequelize");
const sequelize = require("../../config/sequelize");

const Product = sequelize.define(
	"product",
	{
		users_id: {
			type: DataTypes.INTEGER(6),
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		price: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
		},
		stock: {
			type: DataTypes.INTEGER(4),
			allowNull: false,
		},
		status: {
			type: DataTypes.TINYINT(1),
			allowNull: false,
		},
		image_url: {
			type: DataTypes.TEXT,
		},
	},
	{
		timestamps: false,
	}
);

module.exports = Product;
