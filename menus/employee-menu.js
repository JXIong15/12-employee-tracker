const db = require("../db");
const inquire = require("inquirer");
require("console.table");
const menus = require("../")

const empView = {

    async genEmpView() {
        let allEmployees = await db.selectAllEmployees();
        console.table(allEmployees);
        start();
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
                console.log(`\n${res.manager} is not a manager for any employee(s).\n`);
            } else {
                console.log("\n");
                console.table(depEmployees);
            }
            start(); 
        })
    },

    async addEmp() {
        // inquirer.prompt(addEmployee).then(res => {
        //     const employee = new Employee(res.first, res.last, res.role, res.department, res.salary, res.depID, res.manager);
        //     team.push(employee);
        //     // console.log(employee);
        // })
        // .then((res) => {start()})
    },

    async remEmp() {
        console.log("rem emp");
        start();
    },

    async updateEmpRole() {
        console.log("update emp role");
        start();
    },

    async updateEmpMan() {
        console.log("update emp manager");
        start();
    }
}