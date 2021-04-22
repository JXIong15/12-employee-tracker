const mysql = rewuire('mysql');
const util = require('util');

const connections = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employees'
})

connections.conntect();
connections.query = util.promisify(connections.query);

module.exports = connections;