const connection = require('./connection');

class DB {
    constructor(connection) {
        this.connection = connection;
    }

    
    selectAllEmployees() {
        let sql = "SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT_WS('', e2.first_name, ' ', e2.last_name) AS manager " + 
            "FROM employee e " +
            "INNER JOIN employee e2 " +
                "ON e.manager_id = e2.id " +
            "JOIN role r " +
                "ON e.role_id = r.id " +
            "JOIN department d " +
                "ON d.id = r.department_id";

    	return this.connection.query(sql);
    }

    selectDepEmployees() {

    }

    selectManEmployees() {

    }
}

module.exports = new DB(connection);