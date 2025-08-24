require('dotenv').config();
const mysql = require('mysql2');

// Ambil data dari connection string di .env
const url = require('url');
const dbUrl = process.env.DATABASE_URL;
const parsed = url.parse(dbUrl);
const [username, password] = parsed.auth.split(':');
const hostname = parsed.hostname;
const database = parsed.pathname.replace('/', '');
const port = parsed.port;

// Buat koneksi otomatis
const con = mysql.createConnection({
  host: hostname,
  user: username,
  password,
  database,
  port,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

con.query("SELECT 1+1 AS result", function (err, results) {
  if (err) throw err;
  console.log(results);
  con.end();
});

module.exports = con;