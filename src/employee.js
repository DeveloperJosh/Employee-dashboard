import SynTechSqlite3 from './db.js';
const db = new SynTechSqlite3("././database/jobs.db");
class Employee {
    constructor() {
        db.query("CREATE TABLE IF NOT EXISTS company (id INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT, lastName TEXT, Department TEXT, Salary INTEGER)");
    }

    getEmployeeById(id) {
        return db.query("SELECT * FROM company WHERE id = ?", [id]);
    }

    getEmployeeByName(name) {
        return db.query("SELECT * FROM company WHERE name = ?", [name]);
    }

    removeEmployeeById(id) {
        return db.query("DELETE FROM company WHERE id = ?", [id]);
    }

    addEmployee(name, lastName, Department, Salary) {
        return db.query("INSERT INTO company (firstName, lastName, Department, Salary) VALUES (?, ?, ?, ?)", [name, lastName, Department, Salary]);
    }
    getAllEmployees() {
        const data = db.query("SELECT * FROM company");
        return data;
    }
}

export default Employee;
