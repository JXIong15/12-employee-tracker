const db = require("../db");
const inquire = require("inquirer");
require("console.table");

const deptMenu = {
    async depEmpView() {
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
                return console.log("No departments. Add one.")
            } else {
                console.log("\n")
                return console.table(depEmployees); 
            }
        })
    },

    async addDept() {

        return console.log("addDept")
    },

    remDept() {

        return console.log("remDept")
    },

    deptBudget() {

        return console.log("deptBudget")
    },
}


module.exports = deptMenu;