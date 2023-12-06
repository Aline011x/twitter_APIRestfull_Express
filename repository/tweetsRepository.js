const connect = require('../lib/connect')

module.exports = {
    getTweets, 
    createTweet,
    getTweet, 
    deleteTweet,
    updateTweet,
}


async function getTweets() {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM tweets";
        connect.query(query, (err, result) => {
            if (err) {
                reject(err);
            }else {
                resolve(result)
            }
        })
    })
}

async function createTweet(tweet) {
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO tweets SET ?";
        // metodo seguro para evitar inyeccion sql "INSERT INTO tweets SET ?", no `${content}` etc
        connect.query(query, tweet,  (err, res) => {
            if (err) {
                reject(err);
            }else {
                resolve({ tweetId: res.insertId, ...tweet})
            }
        })
    })
}

async function getTweet(tweetId) {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM tweets WHERE tweetId = ? ";
        // const escapedTweetId = connect.escape(tweetId)
        connect.query(query, [tweetId], (err, res) => {
        // connect.query(query, [escapedTweetId], (err, res) => {

        if (err) {
                reject(err);
            }else {
                resolve(res[0])
            }
        })
    })
}

async function deleteTweet(tweetId) {
    return new Promise((resolve, reject) => {
        const query = "DELETE FROM tweets WHERE tweetId = ?";
        connect.query(query, tweetId, (err, res) => {
            if (err) {
                reject(err);
            }else {
                resolve(res.affectedRows)
            }
        })
    })
}

async function updateTweet(tweetId, content) {
    return new Promise((resolve, reject) => {
        const query = "UPDATE tweets SET content = ? WHERE tweetId = ? ";
        // const escapedContent = connect.escape(content)
        // connect.query(query, [escapedContent, tweetId], (err, res) => {
        connect.query(query, [content, tweetId], (err, res) => {

            if (err) {
                reject(err);
            }else {
                resolve(res.affectedRows)
            }
        })
    })
}