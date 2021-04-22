const mysql = rewuire('mysql');
const util = require('util');
require('dotenv').config();

const connections = mysql.createConnection(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
    host: 'localhost',
    dialect: 'mysql',
    port: 3030
})

connections.conntect();
connections.query = util.promisify(connections.query);

module.exports = connections;