const connection = require('./connection');

class DB {
    constructor(connection) {
        this.connection = connection;
    }

    selectAllEmployees() {
        let sql = `
            SELECT 
                e.id, 
                e.first_name, 
                e.last_name, 
                r.title, 
                d.name AS department, 
                r.salary, 
                CONCAT('', m.first_name, ' ', m.last_name) AS manager
            FROM employee e
            JOIN role r
                ON e.role_id = r.id
            JOIN department d
                ON d.id = r.department_id
            LEFT JOIN employee m
                ON e.manager_id = m.id
            ORDER BY e.id ASC`;

    	return this.connection.query(sql);
    }

    selectDepEmployees(dep) {
        let sql = `
            SELECT 
                e.id, 
                e.first_name, 
                e.last_name, 
                r.title, 
                d.name AS department, 
                r.salary, 
                CONCAT('', m.first_name, ' ', m.last_name) AS manager
            FROM employee e 
            JOIN role r 
                ON e.role_id = r.id
            JOIN department d
                ON d.id = r.department_id AND d.name = "${dep}"
            LEFT JOIN employee m
                ON e.manager_id = m.id 
            ORDER BY e.id ASC`;

    	return this.connection.query(sql);
    }

    selectManEmployees() {

    }

    makeManagerList() {
        let sql = "SELECT CONCAT('', e.first_name, ' ', e.last_name) " +
        "FROM employee e " +
        "ORDER BY e.id ASC";

        return this.connection.query(sql);
    }
}

module.exports = new DB(connection);