const mysql = require('mysql');
const inquirer = require('inquirer');
require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'password',
    database: 'company_db'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('connected');
    start();
});

exports.start = () => {
    inq.prompt([
        {
            type: 'list"',
            message: 'What would you like to do?',
            name: 'choice',
            choices: [
                'View All Employees',
                'Add Employee',
                'Update Employee Role',
                'EXIT'                
            ]
        }
    ])
    .then(function(answer) {
        if(answer.choice === 'View All Employees') {
            view.viewAllEmployees();
        }
        else if(answer.choice === 'Add Employee') {
            add.addEmployee();
        }      
        else if(answer.choice === 'Update Employee Role') {
            update.updateRole();
        }
        else if(answer.choice === 'EXIT') {
            connection.end();
            return
        }
    });
};