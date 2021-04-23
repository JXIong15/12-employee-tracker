const db = require("./db")
require("console.table")
const inquire = require("inquirer");

console.log("-----------------\nEmployee Manager\n-----------------");

function start() {
    inquire.prompt({
        type: "list",
        name: "start",
        message: "What would you like to do?",
        choices: ['View All Employees', 'View All Employees By Department', 'View All Employees By Manager', 'Add Employee', 'Remove Employee', 'Update Employee Role', 'Update Employee Manager']
    })
    .then((response) => {
        switch (response.role) {
            case "View All Employees": return genEmpView();
            case "View All Employees By Department": return depEmpView();
            case "View All Employees By Manager": return manEmpView();
            case "Add Employee": return addEmp();
            case "Remove Employee": return remEmp();
            case "Update Employee Role": return updateEmpRole();
            case "Update Employee Manager": return updateEmpMan();
        }
    })
    // viewEmployees();
}

function genEmpView() {

}

function depEmpView() {

}

function manEmpView() {

}

function addEmp() {

}

function remEmp() {

}

function updateEmpRole() {

}

function updateEmpMan() {
    
}


async function viewEmployees() {
    let allEmployees = await db.selectAllEmployees();
    console.table(allEmployees);
}

start();