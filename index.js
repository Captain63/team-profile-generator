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
                name: "managerName"
            },
            {
                type: "number",
                message: "Enter manager's ID:",
                name: "managerID"
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

            <!-- Normalize CSS CDN link -->
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w==" crossorigin="anonymous" />

            <!-- Bootstrap CDN link -->
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">

            <!-- Font Awesome link -->
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
            integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">
        </head>
        <body>
            <nav class="navbar p-3 bg-info">
                <h1 class="text-center text-white w-100"><i class="fas fa-user-friends"></i> Meet the Team <i class="fas fa-user-friends"></i></h1>
            </nav>

            <div class="row px-3">`;

    const closingTags = `
            </div>
        </body>
    </html>`;

    // Manager will always be required, so these tags are assumed for that class
    let centerContent = `
    <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
        <div class="my-3 card">
            <div class="card-header bg-success text-white">
                <h2 class="card-title">${managerResponses.getName()}</h2>
                <h3 class="card-subtitle"><i class="fas fa-user-tie"></i> ${managerResponses.getRole()}</h3>  
            </div>
            <div class="card-body bg-light p-3">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">ID: ${managerResponses.getId()}</li>
                    <li class="list-group-item">Email: <a href="mailto:${managerResponses.getEmail()}">${managerResponses.getEmail()}</a></li>
                    <li class="list-group-item">Office Number: ${managerResponses.getOffice()}</li>
                </ul>
            </div>
        </div>
    </div>`;

    // Confirms there is more than 0 engineer objects -- 0 evaluates to false
    if (engineerResponses.length) {
        engineerResponses.forEach(engineer => {
            // Pulls values for engineer object into HTML tags
            const engineerCard = `
            <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                <div class="my-3 card">
                    <div class="card-header bg-success text-white">
                        <h2 class="card-title">${engineer.getName()}</h2>
                        <h3 class="card-subtitle"><i class="fas fa-user-cog"></i> ${engineer.getRole()}</h3>  
                    </div>
                    <div class="card-body bg-light p-3">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">ID: ${engineer.getId()}</li>
                            <li class="list-group-item">Email: <a href="mailto:${engineer.getEmail()}">${engineer.getEmail()}</a></li>
                            <li class="list-group-item">GitHub: <a href="https://github.com/${engineer.getGitHub()}" target="_blank">${engineer.getGitHub()}</a></li>
                        </ul>
                    </div>
                </div>
            </div>`;

            // Concatenates engineerCard onto centerContent
            centerContent += engineerCard;
        })
    } 
    
    if (internResponses.length) {
        internResponses.forEach(intern => {
            const internCard = `
            <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                <div class="my-3 card">
                    <div class="card-header bg-success text-white">
                        <h2 class="card-title">${intern.getName()}</h2>
                        <h3 class="card-subtitle"><i class="fas fa-user-graduate"></i> ${intern.getRole()}</h3>  
                    </div>
                    <div class="card-body bg-light p-3">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">ID: ${intern.getId()}</li>
                            <li class="list-group-item">Email: <a href="mailto: ${intern.getEmail()}">${intern.getEmail()}</a></li>
                            <li class="list-group-item">School: ${intern.getSchool()}</li>
                        </ul>
                    </div>
                </div>
            </div>`;

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