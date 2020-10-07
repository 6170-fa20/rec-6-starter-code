const sqlite3 = require('sqlite3');

let db;

// name the columns of our tables for localization
const dbColumnNames = {
  userId: "id",
  userName: "name",
  shortName: "short",
  shortCreator: "creator",
  shortURL: "url",
};
Object.freeze(dbColumnNames);

function createDb() {
  console.log("created our db!");
  db = new sqlite3.Database('shortdb.db', function() {
    createUserTable();
    createShortsTable();
  });
};

function createUserTable() {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    ${dbColumnNames.userId} INTEGER PRIMARY KEY AUTOINCREMENT,
    ${dbColumnNames.userName} TEXT NOT NULL UNIQUE
  )`);
};

function createShortsTable() {
  db.run(`CREATE TABLE IF NOT EXISTS shorts (
    ${dbColumnNames.shortName} TEXT PRIMARY KEY,
    ${dbColumnNames.shortURL} TEXT NOT NULL,
    ${dbColumnNames.shortCreator} INTEGER NOT NULL,
    FOREIGN KEY(${dbColumnNames.shortCreator})
    REFERENCES users(${dbColumnNames.userId})
  )`);
};

// Helper wrapper functions that return promises when sql queries are complete.

function dbRun(sqlQuery) {
  return new Promise((resolve, reject) => {
    db.run(sqlQuery, (err) => {
      if (err !== null) {
        reject(err);
      } else {
        resolve();
      }
    })
  });
};

function dbGet(sqlQuery) {
  return new Promise((resolve, reject) => {
    db.get(sqlQuery, (err, row) => {
      if (err !== null) {
        reject(err);
      } else {
        resolve(row);
      }
    })
  });
};

function dbAll(sqlQuery) {
  return new Promise((resolve, reject) => {
    db.all(sqlQuery, (err, rows) => {
      if (err !== null) {
        reject(err);
      } else {
        resolve(rows);
      }
    })
  });
};

createDb();
module.exports.db = db;
module.exports.dbColumnNames = dbColumnNames;
module.exports.dbGet = dbGet;
module.exports.dbAll = dbAll;
module.exports.dbRun = dbRun;