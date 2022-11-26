import Employee from './src/employee.js';
import express from 'express';
// email with nodemailer
import nodemailer from 'nodemailer';
// get email and password from .env file
import dotenv from 'dotenv';
dotenv.config();

let user = process.env.EMAIL;
let password = process.env.PASS;

// set up nodemailer
const transporter = nodemailer.createTransport({
    service: 'FastMail',
    auth: {
        user: user,
        pass: password
    }
});

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

app.get('/employees/email', (req, res) => {
    const { id } = req.query;
    employee.getEmployeeById(id).then((data) => {
        res.render('email', {employee: data[0]});
    });
});

app.get('/employees/email/send', (req, res) => {
    // send email with text from req.query.text
    const { id, subject } = req.query;
    employee.getEmployeeById(id).then((data) => {
        let email = data[0].email;
        let text = req.query.subject
        let message = req.query.message;
        const mailOptions = {
            from: user,
            to: email,
            subject: text,
            text: message
        };
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);    
            }
        });
        res.redirect('/employees');
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
    res.redirect('/employees');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});