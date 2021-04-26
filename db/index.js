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
                ON d.id = r.department_id AND r.department_id = "${dep}"
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
                ON d.id = r.department_id AND e.manager_id = "${manager}"
            ORDER BY e.id ASC`);
    }

    makeManagerList() {
        return this.connection.query(`
            SELECT *
                FROM employee
                ORDER BY id ASC`);
    }
    
    makeDeptList() {
        return this.connection.query(`
            SELECT *
                FROM department
                ORDER BY department.id ASC`);
        
    }

    addNewDept(dept) {
        return this.connection.query(`
            INSERT INTO role SET ?`,
        role)
    }

    removeDepartment(dep) {
        return this.connection.query(`
            DELETE FROM department
            WHERE id = ${dep};
        `)
    }

    makeRoleList() {
        return this.connection.query(`
            SELECT *
                FROM role
                ORDER BY role.id ASC`);
    }

    addNewRole(role) {
        return this.connection.query(`
            INSERT INTO role SET ?`,
        role)
    }

    removeRole(role) {
        return this.connection.query(`
            DELETE FROM role
            WHERE id = ${role};
        `)
    }

    addNewEmp(emp) {
        return this.connection.query(`
            INSERT INTO employee SET ?`,
        emp)
    }

    removeEmp(emp) {
        return this.connection.query(`
            DELETE FROM employee
            WHERE id = ${emp};
        `)
    }

    updateRole(emp, newRole) {
        return this.connection.query(`
            UPDATE employee
            SET role_id = ${newRole}
            WHERE id = ${emp}
                AND role_id IN (
                SELECT id FROM role 
                WHERE id = role_id);
        `)
    }

    updateManager(emp, newMan) {
        return  this.connection.query(`
            UPDATE employee
            SET manager_id = ${newMan}
            WHERE id = ${emp};
            `)
    }
}
module.exports = new DB(connection);