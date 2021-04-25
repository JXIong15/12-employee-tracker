const db = require("../db");
const inquire = require("inquirer");
require("console.table");
const Role = require("../library/Role");
const addRole = require("../library/add-role")
const roles = []; // NEED TO AUTOINPUT ALREADY SAVED ROLES

const roleMenu = {
    addRole() {
        inquire.prompt(addRole).then(async (res) => {
            const role = new Role(res.newRole, res.newRoleDept, res.newRoleSalary);
            role.department_id = await db.getDeptID(res.newRoleDept);

            roles.push(role); // NEED TO SAVE TO LOCALSTORAGE/DATABASE
            return console.table(roles);
        })
        // return console.log("addRole")
    },

    remRole() {

        return console.log("remRole")
    }
}


module.exports = roleMenu;