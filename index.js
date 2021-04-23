const db = require("./db")
require("console.table")

console.log("My app");


async function viewEmployees() {
    let allEmployees = await db.selectAllEmployees();
    console.table(allEmployees);
}

viewEmployees();