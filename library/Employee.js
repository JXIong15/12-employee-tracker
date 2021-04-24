class Employee {
    constructor (first, last, title, department, salary, depID, manager ) {
        this.first = first;
        this.last = last;
        this.title = title;
        // this.department = getDepartment();
        // this.salary = getSalary();
        // this.depID = getDepartmentID();
        this.manager = manager;
    }
    getFirst() {
        return this.first;
    }
    getLast() {
        return this.last;
    }
    getTitle() {
        return this.title;
    }

    // TO-DO: NEED TO GET TO WORK FOR WHEN THERE ARE OTHER DEPARTMENTS
    getDepartment() {
        switch (this.title) {
            case ("Sales Lead" || "Salesperson"): return "Sales";
            case ("Lead Engineer" || "Software Engineer"): return "Enginnering";
            case ("Account Manager" || "Accountant"): return "Finance";
            case ("Legal Team Lead" || "Lawyer"): return "Legal";
        }
    }
    getSalary() {
        switch (this.title) {
            case "Sales Lead": return  100000;
            case "Salesperson": return 80000;
            case "Lead Engineer": return 150000;
            case "Software Engineer": return 120000;
            case "Account Manager": return 160000;
            case "Accountant": return 125000;
            case "Legal Team Lead": return 250000;
            case "Lawyer": return 190000;
        }
    }
    getDepartmentID() {
        switch (this.title) {
            case ("Sales Lead" || "Salesperson"): return 1;
            case ("Lead Engineer" || "Software Engineer"): return 2;
            case ("Account Manager" || "Accountant"): return 3;
            case ("Legal Team Lead" || "Lawyer"): return 4;
        }
    }

    
    getManager() {
        return this.manager;
    }
}

module.exports = Employee;