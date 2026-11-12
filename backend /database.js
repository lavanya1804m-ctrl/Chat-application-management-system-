const mysql = require("mysql2");

const db = mysql.createConnection({
host: "localhost",
user: "root",
password: "YOUR_MYSQL_PASSWORD",
database: "mindora"
});

db.connect((err) => {
if (err) {
console.log("Database connection failed:", err);
} else {
console.log("Mindora Database Connected!");
}
});

module.exports = db;