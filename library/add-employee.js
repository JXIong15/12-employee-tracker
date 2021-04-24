const db = require('../db');
const { connection } = require("../db");

let managerList = [];

async function genManList() {
    connection.query("SELECT * FROM employees")
    managerList = await db.makeManagerList()
    console.log(managerList);
    return managerList;
}

// let roleList = await db.makeManagerList();

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
    // {
    //     type: 'list',
    //     name: 'role',
    //     message: "What is the employee's role?",
    //     choices: []
    // },
    {
        type: 'list',
        name: 'manager',
        message: "Who is the employee's manager?",
        choices: [genManList()]
    }
]

module.exports = addEmployee;