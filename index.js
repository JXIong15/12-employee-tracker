const db = require("./db")
require("console.table")
const inquire = require("inquirer");
const { connection } = require("./db");

console.log("\n-----------------\nEmployee Manager\n-----------------\n");

function start() {
    inquire.prompt({
        type: "list",
        name: "start",
        message: "What would you like to do?",
        choices: ['View All Employees', 'View All Employees By Department', 'View All Employees By Manager', 'Add Employee', 'Remove Employee', 'Update Employee Role', 'Update Employee Manager', 'Quit']
    })
    .then((response) => {
        switch (response.start) {
            case 'View All Employees': return genEmpView();
            case "View All Employees By Department": return depEmpView();
            case "View All Employees By Manager": return manEmpView();
            case "Add Employee": return addEmp();
            case "Remove Employee": return remEmp();
            case "Update Employee Role": return updateEmpRole();
            case "Update Employee Manager": return updateEmpMan();
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
    console.log("view dep emp");
    start();
}

async function manEmpView() {
    console.log("view manager emp");
    start();
}

function addEmp() {
    console.log("add emp");
    start();
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