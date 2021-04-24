const db = require("./db")
require("console.table")
// const inquire = require("inquirer");

console.log("\n-----------------\nEmployee Manager\n-----------------\n");

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
}

async function genEmpView() {
    let allEmployees = await db.selectAllEmployees();
    console.table(allEmployees);
}

async function depEmpView() {
    console.log("view dep emp")
}

async function manEmpView() {
    console.log("view manager emp")
}

function addEmp() {
    console.log("add emp")
}

function remEmp() {
    console.log("rem emp")
}

function updateEmpRole() {
    console.log("update emp role")
}

function updateEmpMan() {
    console.log("update emp manager")
}


async function viewEmployees() {
    
}

// start();
genEmpView();