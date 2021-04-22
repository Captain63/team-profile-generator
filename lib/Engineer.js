// Imports Employee module
const Employee = require('./Employee');

class Engineer extends Employee {
    constructor(name, id, email, gitHub) {
        super(name, id, email);
        this.gitHub = gitHub;
    }

    // Returns GitHub username of class instance
    getGitHub = () => this.gitHub;

    // Overwrites getRole of Employee class
    getRole = () => "Engineer";
}

module.exports = Engineer;