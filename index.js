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

// start();
depEmpView();