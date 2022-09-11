const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'yoga',
    password : 'mysql2022',
    database: 'express-api'
})

module.exports = connection;