USE employees;


INSERT INTO department 
    (name) 
VALUES 
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');


INSERT INTO role 
    (title, salary, department_id) 
VALUES 
    ('Sales Lead', 100000, 1),
    ('SalesPerson', 80000, 1),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 120000, 2),
    ('Account Manager', 160000, 3),
    ('Accountant', 125000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 190000, 4);


INSERT INTO employee 
    (first_name, last_name, role_id, manager_id) 
VALUES 
    ('John', 'Doe', 10, NULL),
    ('Ashley', 'Jones', 11, 1),
    ('Chester', 'Henderson', 12, NULL),
    ('Emily', 'White', 13, 3),
    ('Sylvia', 'Johnson', 14, NULL),
    ('Brandon', 'Scott', 15, 5),
    ('Daniel', 'Chen', 16, NULL),
    ('Tom', 'Brady', 17, 7);