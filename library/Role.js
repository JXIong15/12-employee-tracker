class Role {
    constructor (title, department, salary) {
        this.title = title;
        this.salary = salary;
        this.department = department;
    }

    getTitle() {
        return this.title;
    }


    getSalary() {
        return this.salary;
    }

    getDepartment() {
        return this.department;
    }
}

module.exports = Role;