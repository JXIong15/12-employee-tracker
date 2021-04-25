const db = require('../db');
const { connection } = require("../db");


let rolesList = new Promise(async (res, rej) => {await db.makeRoleList()});
let managerList = new Promise(async (res, rej) => {await db.makeManagerList()});

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
        choices: rolesList
    },
    {
        type: 'list',
        name: 'manager',
        message: "Who is the employee's manager?",
        choices: managerList
    }
]

module.exports = addEmployee;