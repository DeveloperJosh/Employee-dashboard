import Employee from './src/employee.js';
import express from 'express';

const employee = new Employee("./database/jobs_list.db");
const app = express();
const port = 3000;

// set up for ejs
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.redirect('/employees');
});

app.get('/employees', (req, res) => {
    employee.getAllEmployees().then((data) => {
        res.render('employees', {employees: data});
    });
});

app.get('/employees/add', (req, res) => {
    const { firstName, lastName, email, department, salary } = req.query;
    employee.addEmployee(firstName, lastName, email, department, salary);
    res.redirect('/employees');
});

app.get('/employees/delete', (req, res) => {
    const { id } = req.query;
    employee.removeEmployeeById(id);
    res.redirect('/employees');
}); 

app.get('/employees/edit', (req, res) => {
    const { id } = req.query;
    employee.getEmployeeById(id).then((data) => {
        res.render('edit', {employee: data[0]});
    });
});

app.get('/employees/update', (req, res) => {
    // find what is being updated
    const { id, firstName, lastName, email, department, salary } = req.query;
    if (firstName != null) {
        employee.updateEmployeeById(id, firstName);
    }
    if (lastName != null) {
        employee.updateEmployeeById(id, null, lastName);
    }
    if (email != null) {
        employee.updateEmployeeById(id, null, null, email);
    }
    if (department != null) {
        employee.updateEmployeeById(id, null, null, null, department);
    }
    if (salary != null) {
        employee.updateEmployeeById(id, null, null, null, null, salary);
    }
    console.log();
    res.redirect('/employees');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});