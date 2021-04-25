const db = require("./db")
require("console.table");
const rMenu = require("./menus/role-menu")
const dMenu = require("./menus/department-menu");
const eMenu = require("./menus/employee-menu")
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
                await dMenu.depEmpView();
                deptMenu();
                break;
            };
            case 'View All Department(s)': {
                console.log(await db.makeDeptList());
                return deptMenu();
            }
            case 'Add Department': {
                await dMenu.addDept();
                deptMenu();
                break;
            }
            case 'Remove Department': {
                await dMenu.remDept();
                deptMenu();
                break;
            }
            case 'View Department Budget': {
                await dMenu.deptBudget();
                deptMenu();
                break;
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
                await rMenu.addRole();
                roleMenu();
                break;
            }
            case 'Remove Role': {
                await rMenu.remRole();
                roleMenu();
                break;
            }
            case 'View All Role(s)': {
                console.log(await db.makeRoleList());
                return roleMenu();
            }
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
                await eMenu.genEmpView();
                employeeMenu();
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


start();