const connection = require('./connection');

class DB {
    constructor(connection) {
        this.connection = connection;
    }

    selectAllEmployees() {
    	return this.connection.query(
    		"SELECT * from employee"
    	)
    }

    selectDepEmployees() {

    }

    selectManEmployees() {
        
    }
}

module.exports = new DB(connection);