// const employee = require("./add-employee");
const db = require("../db");
const { connection } = require("../db");


class Employee {
    constructor (first, last, title, manager ) {
        this.first = first;
        this.last = last;
        this.title = title;
        this.manager = manager;
    }
    getFirst() {
        return this.first;
    }
    getLast() {
        return this.last;
    }
    getRole() {
        return this.title;
    }
    
    getManager() {
        return this.manager;
    }
}

module.exports = Employee;