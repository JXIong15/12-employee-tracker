const db = require("./db")
const inquire = require("inquirer");
const { connection, addNewEmp, addNewRole, addNewDept } = require("./db");
const { response } = require("express");
const { printTable } = require("console-table-printer")


console.log("\n-----------------\nEmployee Manager\n-----------------\n");

// Main Menu
function start() {
    inquire.prompt({
        type: "list",
        name: "start",
        message: "Which menu would you like to look at?",
        choices: [
            'Department Menu',
            'Role Menu',
            'Employee Menu',
            'Quit'
        ]
    })
    .then((response) => {
        switch (response.start) {
            case 'Department Menu': return deptMenu();
            case 'Role Menu': return roleMenu();
            case 'Employee Menu': return employeeMenu();
            case "Quit": connection.end();
        }
    })
}


// Sub-Menus

async function deptMenu() {
    inquire.prompt({
        type: "list",
        name: "deptMenu",
        message: "What would you like to do in the Department menu?",
        choices: [
            'View All Employees By Department',
            'View All Department(s)',
            'Add Department', 
            'Remove Department',
            'View Department Budget',
            'Back to Main Menu',
            'Quit'
        ]
    })
    .then( (response) => {
        switch (response.deptMenu) {
            case 'View All Employees By Department': return depEmpView();
            case 'View All Department(s)': return deptView();
            case 'Add Department': return addDept();
            case 'Remove Department': return remDept();
            case 'View Department Budget': return deptBudget();
            case 'Back to Main Menu': return start();
            case'Quit': connection.end();
        }
    })
}

function roleMenu() {
    inquire.prompt({
        type: "list",
        name: "roleMenu",
        message: "What would you like to do in the Role Menu?",
        choices: [
            'View All Role(s)',
            'Add Role', 
            'Remove Role',
            'Back to Main Menu',
            'Quit'
        ]
    })
    .then( (response) => {
        switch (response.roleMenu) {
            case 'View All Role(s)':  return roleView();
            case 'Add Role': return addRole();
            case 'Remove Role': remRole();
            case 'Back to Main Menu': return start();
            case "Quit": connection.end();
        }
    })
}

function employeeMenu() {
    inquire.prompt({
        type: "list",
        name: "empMenu",
        message: "What would you like to do in the Employee Menu?",
        choices: [
            'View All Employees',
            'View All Employees By Manager',
            'Add Employee', 
            'Remove Employee', 
            'Update Employee Role', 
            'Update Employee Manager',
            'Back to Main Menu',
            'Quit'
        ]
    })
    .then(async (response) => {
        switch (response.empMenu) {
            case 'View All Employees': return genEmpView();
            case 'View All Employees By Manager': return manEmpView();
            case 'Add Employee': return addEmp();
            case 'Remove Employee': return remEmp();
            case 'Update Employee Role': return updateEmpRole();
            case 'Update Employee Manager': return updateEmpMan();
            case 'Back to Main Menu': return start();
            case "Quit": connection.end();
        }
    })
}


// Department Menu

async function depEmpView() {
    let deptsArr = await deptList();
    inquire.prompt({
        type: 'list',
        name: 'dept',
        message: 'Which department do you want to view?',
        choices: deptsArr
    })
    .then(async (res) => {
        let depEmployees = await db.selectDepEmployees(res.dept);
        if (depEmployees.length === 0) {
            console.log("No Employee(s) in department. Add one.\n");
            addEmp();
        } else {
            printTable(depEmployees); 
            deptMenu();
        }
    })
}

async function deptView() {
    let allDepts = await db.makeDeptList();
    printTable(allDepts);
    deptMenu();
}

async function addDept() {
    inquire.prompt([
        {
            type: 'input',
            name: 'newDept',
            message: "What Department would you like to add?"
        }
    ]).then((res) => {
        const dept = {name:res.newDept}
        db.addNewDept(dept);
        deptView();
    })
}

async function remDept() {
    let deptsArr = await deptList();
    inquire.prompt([
        {
            type: 'list',
            name: 'delete',
            message: "Which Department do you want to remove?",
            choices: deptsArr
        }
    ]).then((res) => {
        console.log(res.delete)
        db.removeDept(res.delete);
        deptView();
    })
}

async function deptBudget() {
    let deptsArr = await deptList();
    inquire.prompt([
        {
            type: 'list',
            name: 'budget',
            message: "Which Department's budget do you want to view?",
            choices: deptsArr
        }
    ]).then(async (res) => {
        let budgetTotal = await db.calcDeptBudget(res.budget);
        printTable(budgetTotal)
        deptMenu();
    })
}




// Roles Menu

async function roleView() {
    let allRoles = await db.makeRoleList();
    printTable(allRoles);
    roleMenu();
}

async function addRole() {
    let deptsArr = await deptList();

    inquire.prompt([
        {
            type: 'input',
            name: 'newRole',
            message: "What Role would you like to add?"
        },
        {
            type: 'input',
            name: 'newRoleSalary',
            message: "What is the Salary for this New Role? (Enter numbers only)"
        },
        {
            type: 'list',
            name: 'newRoleDept',
            message: "What Department does this New Role belong to?",
            choices: deptsArr
        }
    ]).then((res) => {
        const role = {title:res.newRole, salary:res.newRoleSalary, department_id:res.newRoleDept}
        db.addNewRole(role);
        roleView();
    })
}
// FIX THIS
async function remRole() {
    let roleArr = await roleList();
    inquire.prompt([
        {
            type: 'list',
            name: 'delete',
            message: "Which Role do you want to remove?",
            choices: roleArr
        }
    ]).then((res) => {
        db.removeRole(res.delete);
        roleView();
    })
}


// Employee Menu

async function genEmpView() {
    let allEmployees = await db.selectAllEmployees();
    printTable(allEmployees);
    employeeMenu();
}

async function manEmpView() {
    let manArr = await managerList();

    inquire.prompt({
        type: 'list',
        name: 'manager',
        message: "Which manager's team do you want to view?",
        choices: manArr
    })
    .then(async (res) => {
        let depEmployees = await db.selectManEmployees(res.manager);
        if (depEmployees.length === 0) {
            console.log(`Employee is not a manager for any employee(s).\n`);
        } else {
            console.log("\n");
            printTable(depEmployees);
        }
        employeeMenu();
    })
}

async function addEmp() {
    // create arrays of role data and manager data
    let roleArr = await roleList();
    let manArr = await managerList();

    inquire.prompt([
        {
            type: 'input',
            name: 'first',
            message: "What is the employee's first name?"
        },
        {
            type: 'input',
            name: 'last',
            message: "What is the employee's last name?"
        },
        {
            type: 'list',
            name: 'title',
            message: "What is the employee's role?",
            choices: roleArr
        },
        {
            type: 'list',
            name: 'manager',
            message: "Who is the employee's manager?",
            choices: manArr
        }
    ]).then((res) => {
        const emp = {first_name:res.first, last_name:res.last, role_id:res.title, manager_id:res.manager}
        db.addNewEmp(emp);
        genEmpView();
    })
}

async function remEmp() {
    let manArr = await managerList();

    inquire.prompt([
        {
            type: 'list',
            name: 'delete',
            message: "Who is the Employee do you want to remove?",
            choices: manArr
        }
    ]).then((res) => {
        db.removeEmp(res.delete);
        genEmpView();
    })
}

async function updateEmpRole() {
    // create arrays of role data and manager data
    let roleArr = await roleList();
    let manArr = await managerList();

    inquire.prompt([{
        type: 'list',
        name: 'chosenEmp',
        message: "Which Employee's Role would you like to change?",
        choices: manArr
    },
    {
        type: 'list',
        name: 'newRole',
        message: `What is their New Role?`,
        choices: roleArr
    }])
    .then(async (res) => {
        await db.updateRole(res.chosenEmp, res.newRole);
        genEmpView();
    })
}

async function updateEmpMan() {
     let manArr = await managerList();
 
     inquire.prompt([{
        type: 'list',
        name: 'chosenEmp',
        message: "Which Employee's manager would you like to change?",
        choices: manArr
    },
     {
        type: 'list',
        name: 'newMan',
        message: "Who is their New Manager?",
        choices: manArr
     }])
     .then(async (res) => {
         await db.updateManager(res.chosenEmp, res.newMan);
         genEmpView();
     })
}


// Arrays

async function deptList() {
    let depts = await db.makeDeptList();
    if (depts.length === 0) {
        console.log("No department(s). Add one.\n")
        addDept();
    } else {
        const deptsArr = depts.map(({id, name}) => ({
            name: name,
            value: id
        }));
        return deptsArr;
    }
}

async function roleList() {
    const roles = await db.makeRoleList();
    if (roles.length === 0) {
        console.log("No Role(s). Add one.\n");
        addRole();
    } else {
        const roleArr = roles.map(({id, title, salary, department_id}) => ({
            name: title,
            salary: salary,
            department_id: department_id,
            value: id
        }));
        return roleArr;
    }
}

async function managerList() {
    const managers = await db.makeManagerList();
     if (managers.length === 0) {
        console.log("No Employee(s). Add one.\n");
        addEmp();
    } else {
        const manArr = managers.map(({id, first_name, last_name, role_id, manager_id}) => ({
            name: [first_name,last_name].join(" "),
            role_id: role_id,
            manager_id: manager_id,
            value: id
        }));
        return manArr;
    }
}


// initializes app
start();