// utils/db.js

const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Use correct path to store DB inside /data directory
const dbPath = path.resolve(__dirname, "../data/loans.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error connecting to database:", err.message);
  } else {
    console.log("Connected to SQLite database.");
  }
});

// Create both tables
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS loans (
      loan_id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_id TEXT,
      amount REAL,
      period_years INTEGER,
      rate REAL,
      monthly_emi REAL,
      total_amount REAL
    );
  `, (err) => {
    if (err) console.error("Error creating loans table:", err.message);
    else console.log("Loans table ensured.");
  });

  db.run(`
    CREATE TABLE IF NOT EXISTS transactions (
      transaction_id INTEGER PRIMARY KEY AUTOINCREMENT,
      loan_id INTEGER,
      amount REAL,
      type TEXT,
      date TEXT,
      FOREIGN KEY (loan_id) REFERENCES loans(loan_id) ON DELETE CASCADE
    );
  `, (err) => {
    if (err) console.error("Error creating transactions table:", err.message);
    else console.log("Transactions table ensured.");
  });
});

module.exports = db;
