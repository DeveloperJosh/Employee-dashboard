import SynTechSqlite3 from './db.js';
const db = new SynTechSqlite3("././database/jobs.db");
class Employee {
    constructor() {
        db.query("CREATE TABLE IF NOT EXISTS company (id INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT, lastName TEXT, email TEXT, Department TEXT, Salary INTEGER)");
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

    addEmployee(name, lastName, email, Department, Salary) {
        return db.query("INSERT INTO company (firstName, lastName, email, Department, Salary) VALUES (?, ?, ?, ?, ?)", [name, lastName, email, Department, Salary]);
    }
    getAllEmployees() {
        const data = db.query("SELECT * FROM company");
        return data;
    }

    updateEmployeeById(id, name=null, lastName=null, email=null, Department=null, Salary=null) {
        // check what is being updated
        if (name != null) {
            db.query("UPDATE company SET firstName = ? WHERE id = ?", [name, id]);
        }       
        if (lastName != null) {
            db.query("UPDATE company SET lastName = ? WHERE id = ?", [lastName, id]);
        }
        if (email != null) {
            db.query("UPDATE company SET email = ? WHERE id = ?", [email, id]);
        }
        if (Department != null) {   
            db.query("UPDATE company SET Department = ? WHERE id = ?", [Department, id]);
        }
        if (Salary != null) {
            db.query("UPDATE company SET Salary = ? WHERE id = ?", [Salary, id]);
        }
    }
}

export default Employee;
