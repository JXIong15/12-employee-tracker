const db = require('../db');
const { connection } = require("../db");

// let deptList = [];

// async function lists() {
//     deptList = await db.makeDeptList();
// }

// lists();

const addRole = [
    {
        type: 'input',
        name: 'newRole',
        message: "What Role would you like to add?"
    },
    {
        type: 'input',
        name: 'newRoleSalary',
        message: "What is the Salary for this New Role? (Enter numbers only)"
    },
    {
        type: 'list',
        name: 'newRoleDept',
        message: "What Department does this New Role belong to?",
        choices: deptsArr
        // choices: ["Sales"]
    }
]

module.exports = addRole;