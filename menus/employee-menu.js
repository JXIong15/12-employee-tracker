const db = require("../db");
const inquire = require("inquirer");
require("console.table");
const addEmployee = require("../library/add-employee");
const Employee = require("../library/Employee.js");
const team = []; // SAVE TO LOCAL STORAGE?
const { response } = require("express");

const empMenu= {
    async genEmpView() {
        let allEmployees = await db.selectAllEmployees();
        console.table(allEmployees);
    },

    async manEmpView() {
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
                return console.log(`\n${res.manager} is not a manager for any employee(s).\n`);
            } else {
                console.log("\n");
                return console.table(depEmployees);
            }
        })
    },

    async addEmp() {
        inquire.prompt(addEmployee).then(async (res) => {
            let data = await db.data(res.title);

            const employee = new Employee(res.first, res.last, res.title);
            employee.department = await db.deptName(data[0].department_id);
            employee.salary = data[0].salary;;
            employee.manager = res.manager;
            employee.depID = data[0].department_id;

            team.push(employee);
            console.table(team);
        })
    },

    async remEmp() {
        console.log("rem emp");
    },

    async updateEmpRole() {
        console.log("update emp role");
    },

    async updateEmpMan() {
        console.log("update emp manager");
    }
}

module.exports = empMenu;