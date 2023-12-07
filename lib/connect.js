const debug  = require('debug')('app:database');
const dotenv = require('dotenv');
dotenv.config();

const config = require('../config');
const mysql = require('mysql2');

const connect = mysql.createConnection(config.databaseUrl)
// const connect = mysql.createConnection(process.env.DATABASE_URL)

debug("Connected to database ")

module.exports = connect;
