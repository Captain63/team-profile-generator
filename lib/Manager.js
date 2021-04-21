// Imports Employee module
const Employee = require('./Employee');

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.officeNumber = officeNumber;
    }

    // Overwrites getRole of Employee class
    getRole = () => "Manager";
}

module.exports = Manager;