const debug  = require('debug')('app:database:script');

const connect = require('../lib/connect')

// -- Función para crear la tabla 'users'
const createUsersTable = `CREATE TABLE users (
    userId INT AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    passwordHash VARCHAR(255) NOT NULL,
    creationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updateDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    bio TEXT,
    location VARCHAR(255),
    PRIMARY KEY (userId)
)`;

// -- Función para crear la tabla 'tweets'
const createTweetsTable = `CREATE TABLE tweets (
    tweetId INT AUTO_INCREMENT,
    userId INT,
    content VARCHAR(280),
    creationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (tweetId)
)`;

const insertUsers = `INSERT INTO users (name, email, passwordHash, bio, location)
VALUES
    ('JohnDoe', 'johndoe@example.com', 'hashedpassword1', 'I love coding', 'New York'),
    ('JaneDoe', 'janedoe@example.com', 'hashedpassword2', 'I love databases', 'San Francisco')`;

const printError = (msg) => (err) => {
    err && debug(msg,err)
}

connect.connect(err => {
    err && debug("Error connecting to database", err)

    connect.query(createUsersTable, printError("Error creating user table"))
    connect.query(createTweetsTable, printError("Error creating tweet table"))
    connect.query(insertUsers, printError("Error inserting users!"))
    console.log("Creation tables and inserting users done!")
    connect.end()
})
