import Employee from "./src/employee.js";

// add 100 employees with random names
const employee = new Employee();
for (let i = 0; i < 100; i++) {
    // generate random names
    const firstName = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const lastName = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const department = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const salary = Math.floor(Math.random() * 100000);
    employee.addEmployee(firstName, lastName, department, salary);
}