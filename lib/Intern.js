// Imports Employee module
const Employee = require('./Employee');

class Intern extends Employee {
    constructor(name, id, email, school) {
        super(name, id, email);
        this.school = school;
    }

    // Returns school property of class instance
    getSchool = () => this.school;

    // Overwrites getRole of Employee class
    getRole = () => "Intern";
}