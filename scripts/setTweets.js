const debug  = require('debug')('app:database:script');
const connect = require('../lib/connect')

const insertTweets = `
INSERT INTO tweets (userId, content)
VALUES
    (1, 'This is my second tweet!'),
    (1, 'I Love coding'),
    (1, 'Node.js is awesome'),
    (1, 'Just finished my OpenAI project'),
    (2, 'Hello Twitter!'),
    (2, 'This is my second tweet!'),
    (2, 'I Love databases'),
    (2, 'MySQL is great'),
    (2, 'Just finished a database design project');
`;

const printError = (msg) => (err) => {
    err && debug(msg,err)}

connect.connect(err => {
    err && debug("Error connecting to database", err)
    // connection.query(createUsersTable, printError("Error creating user table"))
    // connection.query(createTweetsTable, printError("Error creating tweet table"))
    connect.query(insertTweets, printError("Error inserting tweets!"))
    // console.log("Inserting tweets done!")
    debug("Inserting tweets done!")
    connect.end()
})