const db = require('../db');
const { connection } = require("../db");

// let rolesList = [];
// let managerList = [];

// async function lists() {
//     managerList = await db.makeManagerList();
//     rolesList = await db.makeRoleList();
// }

// lists();

const addEmployee = [
    {
        type: 'input',
        name: 'first',
        message: "What is the employee's first name?"
    },
    {
        type: 'input',
        name: 'last',
        message: "What is the employee's last name?"
    },
    {
        type: 'list',
        name: 'title',
        message: "What is the employee's role?",
        // choices: rolesList
        choices: ["Lawyer"]
    },
    {
        type: 'list',
        name: 'manager',
        message: "Who is the employee's manager?",
        // choices: managerList
        choices: ["John Doe"]
    }
]

module.exports = addEmployee;