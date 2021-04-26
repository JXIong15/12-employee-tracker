const db = require("../db");
const inquire = require("inquirer");
require("console.table");
const addEmployee = require("../library/add-employee");
const Employee = require("../library/Employee.js");
const team = []; // SAVE TO LOCAL STORAGE?
const { response } = require("express");

const empMenu= {
    

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

    // TO-DO
    async addEmp() {
        inquire.prompt(addEmployee).then(async (res) => {
            let data = await db.roleData(res.title);

            const employee = new Employee(res.first, res.last, res.title);
            employee.department = await db.deptName(data[0].department_id);
            employee.salary = data[0].salary;;
            employee.manager = res.manager;
            employee.depID = data[0].department_id;

            team.push(employee); // NEED TO SAVE TO LOCALSTORAGE/DATABASE
            return console.table(team);
        })
    },

    async remEmp() {
        console.log("rem emp");
    },

    // TO-DO IF I HAVE TIME: DISPLAY CHOSEN EMP CURRENT ROLE
    async updateEmpRole() {
        let empList = await db.makeManagerList();
        let roleList = await db.makeRoleList();
        let emp;

        inquire.prompt({
            type: 'list',
            name: 'chosenEmp',
            message: "Which Employee's Role would you like to change?",
            choices: empList
        })
        .then(async (res) => {
            emp = res.chosenEmp;
            inquire.prompt({
                type: 'list',
                name: 'newRole',
                message: `What is their New Role?`,
                choices: roleList
            })
            .then(async (resp) => {
                await db.updateRole(emp, resp.newRole);
                let newTable = await empMenu.genEmpView();
                return console.table(newTable);
            })
        })
    },

    async updateEmpMan() {
        return console.log("update emp manager");

        // DOESN'T WORK RN
        let empList = await db.makeManagerList();
        let roleList = await db.makeRoleList();
        let emp;

        inquire.prompt({
            type: 'list',
            name: 'chosenEmp',
            message: "Which Employee's manager would you like to change?",
            choices: empList
        })
        .then(async (res) => {
            emp = res.chosenEmp;
            inquire.prompt({
                type: 'list',
                name: 'newMan',
                message: "Who is their New Manager?",
                choices: roleList
            })
            .then(async (resp) => {
                await db.updateRole(emp, resp.newMan);
                let newTable = await empMenu.genEmpView();
                return console.table(newTable);
            })
        })
    }
}

module.exports = empMenu;