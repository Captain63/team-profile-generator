// Install modules
const inquirer = require("inquirer");
const fs = require("fs");

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
                name: "managerName"
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
                message: "Test:",
                name: "Test"
            }
        ]
    },

    // Intern questions
    intern: {
        questions: [

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
                    engineerResponses.push(responses);
                    serveMenu();
                });
        } else if (input["menuResponse"] === "Add Intern") {
            inquirer
                .prompt(prompts.intern.questions)
                .then(responses => {

                    // I think we should be calling the class here -- maybe with map?

                    internResponses.push(responses);
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
        .then((input) => serveQuestion(input)); 
}

// Initial function to prompt user for inputs
const initiateQuestions = () => {
    inquirer
        // Collects prompts for manager class
        .prompt(prompts.manager.questions)

        // Displays menu to allow user to choose next steps
        .then(responses => {
            managerResponses = responses;

            serveMenu();
        });      
}

// Function called on runtime
initiateQuestions();