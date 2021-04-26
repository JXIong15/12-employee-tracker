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

    roleData(role) {
        let roleID = this.connection.query(`
        SELECT id FROM department 
            WHERE id IN (
        SELECT department_id FROM role 
            WHERE title = "${role}");
        `);

        return this.connection.query(`
            SELECT * FROM role 
            WHERE department_id = ${roleID[0].id} AND title = "${role}"
            ORDER BY role.id ASC;`);
    }

    getDeptID(dName) {
        return this.connection.query(
            `SELECT id FROM department WHERE name = "${dName}";`
        )
    }

    deptName(deptID) {
        return this.connection.query(
            `SELECT name FROM department WHERE id = ${deptID}`
        )
    }



    addNewEmp(emp) {
        return this.connection.query(`
            INSERT INTO employee SET ?`,
        emp)
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



    updateManager(name, newMan) {
        return("db.index.updateManager")
        // search for the role_id of the input role
        let result =  this.connection.query(`
            SELECT id FROM employee e
            WHERE CONCAT('', e.first_name, ' ', e.last_name) = "${newMan}";
        `)
        console.log(result[0].id);
        let newManID = result[0].id;

        return  this.connection.query(`
            `)
    }
}
module.exports = new DB(connection);