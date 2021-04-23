const mysql = require('mysql');
const util = require('util');
require('dotenv').config();

const connection = mysql.createConnection(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
    host: 'localhost',
    dialect: 'mysql',
    port: 3030
})

connection.conntect();
connection.query = util.promisify(connection.query);

module.exports = connection;