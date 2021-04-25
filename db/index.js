const connection = require('./connection');

class DB {
    constructor(connection) {
        this.connection = connection;
    }

    selectAllEmployees() {
        return this.connection.query(`
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
            ORDER BY e.id ASC`);
    }

    selectDepEmployees(dep) {
        return this.connection.query(`
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
            ORDER BY e.id ASC`);
    }

    selectManEmployees(manager) {
        return this.connection.query(`
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
            LEFT JOIN employee m
                ON e.manager_id = m.id
            JOIN department d
                ON d.id = r.department_id AND CONCAT('', m.first_name, ' ', m.last_name) = "${manager}"
            ORDER BY e.id ASC`);
    }

    async makeManagerList() {
        let managerList = [];
        let rdp = await this.connection.query(`
            SELECT CONCAT('', e.first_name, ' ', e.last_name) AS manager
                FROM employee e
                ORDER BY e.id ASC`);
        let managers = JSON.parse(JSON.stringify(rdp));
        managers.forEach(employee => {
            managerList.push(employee.manager)
        }) 
        return managerList;
    }
    
    async makeDeptList() {
        let deptList = [];
        let rdp = await this.connection.query(`
            SELECT name
                FROM department
                ORDER BY department.id ASC`);
        let depts = JSON.parse(JSON.stringify(rdp));
        depts.forEach(dept => {
            deptList.push(dept.name)
        }) 
        return deptList;
    }
}

module.exports = new DB(connection);