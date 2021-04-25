const db = require("../db");
const inquire = require("inquirer");
require("console.table");

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
        // inquirer.prompt(addEmployee).then(res => {
        //     const employee = new Employee(res.first, res.last, res.role, res.department, res.salary, res.depID, res.manager);
        //     team.push(employee);
        //     // console.log(employee);
        // })
        // .then((res) => {start()})
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