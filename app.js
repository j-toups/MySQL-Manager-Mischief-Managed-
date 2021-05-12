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
    exports.start();
});

//Prompts user to select what they want to do then move to that selection
exports.start = () => {
    inquirer.prompt([
        {
            type: 'list',
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

//Option: Add Employee
exports.addEmployee = () => {
    view.getAllRoles(function(rolesResults) {
        var roles = [];
        for(var i = 0; i < rolesResults.length; i++) {
            roles.push(rolesResults[i].title);
        }
        var options = [
        {
            type: 'input',
            message: 'Employee First Name',
            name: 'firstName',
            default: ' '
        },
        {
            type: 'input',
            message: 'Employee Last Name',
            name: 'lastName',
            default: ' '
        },
        {
            type: 'list',
            message: 'Employee Role',
            name: 'role',
            choices: roles
        }];

        inquirer.prompt(options)
        .then((answers) => {
            var roleId = null;
            for(var i= 0; i < rolesResults.length; i++) {
                if(rolesResults[i].title === answers.role) {
                    roleId = rolesResults[i].role_id
                }
            }
            connection.query('INSERT INTO employees SET ?',
                {
                    first_name: answers.firstName,
                    last_name: answers.lastName,
                    emp_role_id: roleId
                },
            function(err,results) {
                if(err) throw err;
                console.log('Successfully added');
                app.start();
            });
        });
    });
};