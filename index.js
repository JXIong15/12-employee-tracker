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

const menus = {
    start() {
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
                case 'Department Menu': return menus.deptMenu();
                case 'Role Menu': return menus.roleMenu();
                case 'Employee Menu': return emenus.mployeeMenu();
                case "Quit": connection.end();
            }
        })
    },

    deptMenu() {
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
                case 'View All Employees By Department': return dMenu.depEmpView();
                case 'View All Department(s)': {
                    console.log(await db.makeDeptList());
                    return menus.deptMenu();
                }
                case 'Add Department': return dMenu.addDept();
                case 'Remove Department': return dMenu.remDept();
                case 'View Department Budget': return dMenu.deptBudget();
                case 'Back to Main Menu': return menus.start();
                case'Quit': connection.end();
            }
        })
    },

    roleMenu() {
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
                case 'Add Role': rMenu.addRole();
                case 'Remove Role': rMenu.remRole();
                case 'View All Role(s)': {
                    console.log(await db.makeRoleList());
                    return menus.roleMenu();
                }
                case 'Back to Main Menu': return menus.start();
                case "Quit": connection.end();
            }
        })
    },

    employeeMenu() {
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
                case 'View All Employees': return eMenu.genEmpView();
                case 'View All Employees By Manager': return eMenu.manEmpView();
                case 'Add Employee': return eMenu.addEmp();
                case 'Remove Employee': return eMenu.remEmp();
                case 'Update Employee Role': return eMenu.updateEmpRole();
                case 'Update Employee Manager': return eMenu.updateEmpMan();
                case 'Back to Main Menu': return menus.start();
                case "Quit": connection.end();
            }
        })
    }
}


menus.start();

module.exports = menus;