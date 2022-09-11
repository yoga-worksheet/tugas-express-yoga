const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("express-api", "yoga", "mysql2022", {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;