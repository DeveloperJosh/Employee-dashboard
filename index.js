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
    const { firstName, lastName, department, salary } = req.query;
    employee.addEmployee(firstName, lastName, department, salary);
    res.redirect('/employees');
});

app.get('/employees/delete', (req, res) => {
    const { id } = req.query;
    employee.removeEmployeeById(id);
    res.redirect('/employees');
}); 

app.get('/employees/edit', (req, res) => {
    const { id } = req.query;
    console.log(id);
    employee.getEmployeeById(id).then((data) => {
        res.send(data);
    });
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});