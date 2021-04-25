const db = require("./db")
require("console.table");
const rMenu = require("./menus/role-menu")
const inquire = require("inquirer");
const { connection } = require("./db");
const { response } = require("express");
// const addEmployee = require("./library/add-employee");
// const Employee = require("./library/Employee.js");
const team = [];

console.log("\n-----------------\nEmployee Manager\n-----------------\n");

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

function deptMenu() {
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
    .then(async (response) => {
        switch (response.deptMenu) {
            case 'View All Employees By Department': {
                depEmpView();
                return deptMenu();
            }
            case 'View All Department(s)': {
                console.log(await console.log(db.makeDeptList()));
                return deptMenu();
            }
            case 'Add Department': {
                addDept();
                return deptMenu();
            }
            case 'Remove Department': {
                remDept();
                return deptMenu();
            }
            case 'View Department Budget': {
                deptBudget();
                return deptMenu();
            }
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
            'Add Role', 
            'Remove Role',
            'View All Role(s)',
            'Back to Main Menu',
            'Quit'
        ]
    })
    .then(async (response) => {
        switch (response.roleMenu) {
            case 'Add Role': {
                rMenu.addRole();
                return roleMenu();
            }
            case 'Remove Role': {
                rMenu.remRole();
                return roleMenu();
            }
            case 'View All Role(s)': {
                console.log(await db.makeRoleList());
                return roleMenu();
            }
            case 'Back to Main Menu': return start();
            case "Quit": connection.end();
        }
    })
    // .then((res) => roleMenu());
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
    .then((response) => {
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


async function genEmpView() {
    let allEmployees = await db.selectAllEmployees();
    console.table(allEmployees);
    start();
}

async function depEmpView() {
    let deptList = await db.makeDeptList();

    inquire.prompt({
        type: 'list',
        name: 'dept',
        message: 'Which department do you want to view?',
        choices: deptList
    })
    .then(async (res) => {
        let depEmployees = await db.selectDepEmployees(res.dept);
        if (deptList.length = 0) {
            console.log("No departments. Add one.")
        } else {
            console.log("\n")
            console.table(depEmployees); 
        }
        start(); 
    })
}

async function manEmpView() {
    let managerList = await db.makeManagerList();

    inquire.prompt({
        type: 'list',
        name: 'manager',
        message: "Which manager's team do you want to view?",
        choices: managerList
    })
    .then(async (res) => {
        let depEmployees = await db.selectManEmployees(res.manager);
        if (depEmployees.length === 0) {
            console.log(`\n${res.manager} is not a manager for any employee(s).\n`);
        } else {
            console.log("\n");
            console.table(depEmployees);
        }
        start(); 
    })
}

async function addEmp() {
    // inquirer.prompt(addEmployee).then(res => {
    //     const employee = new Employee(res.first, res.last, res.role, res.department, res.salary, res.depID, res.manager);
    //     team.push(employee);
    //     // console.log(employee);
    // })
    // .then((res) => {start()})
}

function remEmp() {
    console.log("rem emp");
    start();
}

function updateEmpRole() {
    console.log("update emp role");
    start();
}

function updateEmpMan() {
    console.log("update emp manager");
    start();
}

start();
// depEmpView();