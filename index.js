// Install modules
const inquirer = require("inquirer");
const fs = require("fs");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

// Question sets for inquirer to reference
const prompts = {
    // Main menu to allow for different engineer/intern entries
    menu: {
        type: "list",
        message: "Would you like to add more employees?",
        choices: ["Add Engineer", "Add Intern", "No, I'm finished"],
        name: "menuResponse"
    },

    // Manager questions to be served at start of collectResponses
    manager: {
        questions: [
            {
                type: "input",
                message: "Enter manager's name:",
                name: "managerID"
            },
            {
                type: "number",
                message: "Enter manager's ID:",
                name: "managerNumber"
            },
            {
                type: "email",
                message: "Enter manager's email:",
                name: "managerEmail"
            },
            {
                type: "number",
                message: "Enter manager's office number:",
                name: "managerOfficeNumber"
            }
        ]
    },

    // Engineer questions
    engineer: {
        questions: [
            {
                type: "input",
                message: "Enter engineer's name:",
                name: "engineerName"
            },
            {
                type: "number",
                message: "Enter engineer's ID:",
                name: "engineerID"
            },
            {
                type: "email",
                message: "Enter engineer's email:",
                name: "engineerEmail"
            },
            {
                type: "input",
                message: "Enter engineer's GitHub username:",
                name: "engineerGitHub"
            }
        ]
    },

    // Intern questions
    intern: {
        questions: [
            {
                type: "input",
                message: "Enter intern's name:",
                name: "internName"
            },
            {
                type: "number",
                message: "Enter intern's ID:",
                name: "internID"
            },
            {
                type: "email",
                message: "Enter intern's email:",
                name: "internEmail"
            },
            {
                type: "input",
                message: "Enter intern's school:",
                name: "internSchool"
            }
        ]
    }
}

// Variable declarations to store responses collected by inquirer
let managerResponses;
const engineerResponses = [];
const internResponses = [];

// Logic to render content on page after inquirer finishes
const writeToPage = () => {
    const startingTags = `
    <!DOCTYPE html>
    <html>
        <head>
            <title>Meet the Team</title>
        </head>
        <body>`;

    const closingTags = `
        </body>
    </html>`;

    // Manager will always be required, so these tags are assumed for that class
    let centerContent = "";

    // Confirms there is more than 0 engineer objects -- 0 evaluates to false
    if (engineerResponses.length) {
        engineerResponses.forEach(engineer => {
            // Pulls values for engineer object into HTML tags
            const engineerCard = "";

            // Concatenates engineerCard onto centerContent
            centerContent += engineerCard;
        })
    } else if (internResponses.length) {
        internResponses.forEach(intern => {
            const internCard = "";

            centerContent += internCard;
        })
    }

    // Concatenates completed tags together to create complete HTML document
    const finishedHTML = startingTags + centerContent + closingTags;

    // Writes HTML file once content is assembled
    fs.writeFile("./dist/index.html", finishedHTML, err => {
        err ? console.error(err) : console.log("Page generated!");
    })
}

const serveMenu = () => {

    // Nested function to serve corresponding questions based on user input collected from inquirer prompt below
    const serveQuestion = input => {
        if (input["menuResponse"] === "Add Engineer") {
            inquirer
                .prompt(prompts.engineer.questions)
                .then(responses => {
                    engineerResponses.push(
                        // Creates new instance of engineer class from user inputs class and stores in array
                        new Engineer(
                            responses["engineerName"], 
                            responses["engineerID"],
                            responses["engineerEmail"],
                            responses["engineerGitHub"]
                        )
                    );
                    serveMenu();
                });
        } else if (input["menuResponse"] === "Add Intern") {
            inquirer
                .prompt(prompts.intern.questions)
                .then(responses => {
                    internResponses.push(
                        // Creates new instance of intern class from user inputs class and stores in array
                        new Intern(
                            responses["internName"], 
                            responses["internID"],
                            responses["internEmail"],
                            responses["internSchool"]
                        )
                    );;
                    serveMenu();
                });
        } else {
            // Exits menu loop and calls writeToPage
            console.log("Responses captured");
            writeToPage();
        }
    }

    // Displays menu
    inquirer
        .prompt(prompts.menu)
        // Passes user input into nested function
        .then((input) => serveQuestion(input)); 
}

// Initial function to prompt user for inputs
const initiateQuestions = () => {
    inquirer
        // Collects prompts for manager class
        .prompt(prompts.manager.questions)
        .then(responses => {

            // Creates new instance of manager class from responses and stores in variable
            managerResponses = new Manager(
                responses["managerName"], 
                responses["managerID"],
                responses["managerEmail"],
                responses["managerOfficeNumber"]
            );

            // Displays menu for user to decide next steps
            serveMenu();
        });      
}

// Function called on runtime
initiateQuestions();