const db = require("./db")
require("console.table")
const inquire = require("inquirer");
const { connection } = require("./db");
// const addEmployee = require("./library/add-employee");
// const Employee = require("./library/Employee.js");
const team = [];


console.log("\n-----------------\nEmployee Manager\n-----------------\n");

function start() {
    inquire.prompt({
        type: "list",
        name: "start",
        message: "What would you like to do?",
        choices: [
            'View All Employees',
            'View All Employees By Department',
            'View All Employees By Manager',
            'Add Employee', 'Remove Employee', 
            'Update Employee Role', 
            'Update Employee Manager', 
            'Quit'
        ]
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

function depEmpView() {
    inquire.prompt({
        type: 'list',
        name: 'dep',
        message: 'Which department do you want to view?',
        // TO-DO: DEPARTMENT LIST RATHER THAN PSEUDO
        choices: ["Sales"] 
    })
    .then(async (res) => {
        // departmentView(res.dep)
        let depEmployees = await db.selectDepEmployees(res.dep);
        console.log("\n")
        console.table(depEmployees);  
        start(); 
    })
}

async function manEmpView() {
    console.log("view manager emp");
    start();
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