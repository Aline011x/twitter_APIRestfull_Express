const config = require('../config');
const mysql = require('mysql2');

const connect = mysql.createConnection(config.databaseUrl)
console.log("Connected to database ")
module.exports = connect; 