class Employee {
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
    }

    // Returns name property of class instance
    getName = () => this.name;

    // Returns ID property of class instance
    getId = () => this.id;

    // Returns email property of class instance
    getEmail = () => this.email;

    // Returns role of class instance -- overridden by subclasses
    getRole = () => "Employee";
}

module.exports = Employee;