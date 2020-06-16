var inquirer = require('inquirer')
var fs = require('fs')
var axios = require('axios')
var userInput = {}

inquirer
    .prompt([
        {
            type: 'input',
            message: 'What is your GitHub user name?',
            name: 'userName',
        },
        {
            type: 'input',
            message: 'What is your email address?',
            name: 'email',
        },
        {
            type: 'input',
            message: 'What is your project repo?',
            name: 'projectRepo',
        },
        {
            type: 'input',
            message: 'What is your project title?',
            name: 'projectTitle',
        },
        {
            type: 'input',
            message: 'What is your project description?',
            name: 'projectDescription',
        },
        {
            type: 'input',
            message: 'What are the installation instructions?',
            name: 'installation',
        },
        {
            type: 'input',
            message: 'What is the usage information?',
            name: 'usageInfo',
        },
        {
            type: 'input',
            message: 'What are your contribution guidelines?',
            name: 'guidelines',
        },
        {
            type: 'input',
            message: 'What are the test instructions?',
            name: 'instructions',
        },
        {
            type: 'list',
            message: 'What is your license?',
            name: 'license',
            choices: [
                "ISC",
                "MIT",
                "Apache"
            ]
        }
    ])
    .then(function (response) {
        console.log(response)
        userInput = response
        return axios.get(`https://api.github.com/users/${response.userName}`)
    }).then(function(gitHubData) {
        console.log(gitHubData.data)
        var readMeText = `

# ${userInput.projectTitle}


## Description

${userInput.projectDescription}


## Table of Contents


## Installation

${userInput.installation}


## Usage

${userInput.usageInfo}


## License

(https://img.shields.io/badge/license-${userInput.license}-blue.svg)


## Contributing

${userInput.guidelines}


## Tests

${userInput.instructions}


## Questions

If you have any additional questions, feel free to contact me via email:
${userInput.email}

* ![GitHub license] (https://img.shields.io/badge/license-${userInput.license}-blue.svg)`
console.log(readMeText)
return readMeText
    }).then(function(fileData) {
        fs.writeFileSync("./README.md", fileData)
        console.log("File has been created.")
    })