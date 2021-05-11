Insert into department (dept_name) values ('Finance'), ('Engineering'), ('Legal');
Insert	into	company_role (title, salary, department_id) values
('Analyst', 60000.00, 1),
('Associate Analyst', 70000.00, 1),
('Senior Analyst', 80000.00, 1),
('Engineer', 70000.00, 2),
('Associate Engineer', 80000.00, 2),
('Senior Engineer', 90000.00, 2),
('Junior Attorney', 70000.00, 3),
('Associate Attorney', 80000.00, 3),
('Senior Associate', 90000.00, 3);

Insert into employees (first_name, last_name, employee_role_id, manager_id) values
('Pink', 'Ranger', 1, null),
('Turtle', 'Dove', 2, 1),
('Bob', 'Roberts', 3, null);


