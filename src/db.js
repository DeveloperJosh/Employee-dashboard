/// sqllite driver for node.js
import sqlite3 from 'sqlite3';

class SynTechSqlite3 {
    constructor(db=":memory:") {
        this.db = new sqlite3.Database(db);
        if (db != ":memory:") {
            this.db.run("PRAGMA foreign_keys = ON");
        } else {
            this.db.run("PRAGMA foreign_keys = OFF");
        }
    }
    
    query(sql, params) {
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }
}

export default SynTechSqlite3;