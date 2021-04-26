const db = require("./db")
const inquire = require("inquirer");
const { connection } = require("./db");
const { response } = require("express");
require("console.table");
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
            case 'View All Employees': {
                genEmpView();
                break;
            };
            case 'View All Employees By Manager': {
                await eMenu.manEmpView();
                employeeMenu();
                break;
            }
            case 'Add Employee': {
                await eMenu.addEmp();
                employeeMenu();
                break;
            }
            case 'Remove Employee': {
                await eMenu.remEmp();
                employeeMenu();
                break;
            }
            case 'Update Employee Role': {
                await eMenu.updateEmpRole();
                employeeMenu();
                break;
            }
            case 'Update Employee Manager': {
                await eMenu.updateEmpMan();
                employeeMenu();
                break;
            }
            case 'Back to Main Menu': return start();
            case "Quit": connection.end();
        }
    })
}





async function genEmpView() {
    let allEmployees = await db.selectAllEmployees();
    printTable(allEmployees);
    employeeMenu();
}


async function deptView() {
    let allDepts = await db.makeDeptList();
    printTable(allDepts);
    deptMenu();
}


// Department Menu

async function depEmpView() {
    let depts = await db.makeDeptList();
    const deptsArr = depts.map(({id, name}) => ({
        name: name,
        value: id
    }));

    inquire.prompt({
        type: 'list',
        name: 'dept',
        message: 'Which department do you want to view?',
        choices: deptsArr
    })
    .then(async (res) => {
        let depEmployees = await db.selectDepEmployees(res.dept);
        if (deptList.length = 0) {
            console.log("No departments. Add one.")
        } else {
            console.log("\n")
            console.table(depEmployees); 
        }
        deptView();
    })
}

async function addDept() {
    inquire.prompt(addDept).then(async (res) => {
        const dept = new Department(res.newDept);
        depts.push(dept); // NEED TO SAVE TO LOCALSTORAGE/DATABASE
        return console.table(depts);
    })

   

    inquire.prompt([
        {
        type: 'input',
        name: 'newDept',
        message: "What Department would you like to add?"
        }
    ]).then((res) => {
        const role = {title:res.newRole, salary:res.newRoleSalary, department_id:res.newRoleDept}
        db.addNewRole(role);
        deptView();
    })
}

function remDept() {

    return console.log("remDept")
}

function deptBudget() {

    return console.log("deptBudget")
}



// Roles Menu

async function roleView() {
    let allRoles = await db.makeRoleList();
    printTable(allRoles);
    roleMenu();
}

async function addRole() {
    const depts = await db.makeDeptList();
    const deptsArr = depts.map(({id, name}) => ({
        name: name,
        value: id
    }));

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

async function remRole() {

    return console.log("remRole")
}


// initializes app
start();


// eMenu.addEmp()
// rMenu.addRole();
// dMenu.addDept();
