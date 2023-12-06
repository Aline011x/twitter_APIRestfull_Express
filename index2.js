const connect = require('./lib/connect')
const express = require('express');
const app = express()
const port = 3000; 

const tweetsRouter = require('./routes/tweetsRouter')

// const { logError, wrapError, errorHandler } = require('./utils/middlewares/errorMiddlewares');
// const { notFound } = require('@hapi/boom');


// function getTweets(){
//     return new Promise((resolve, reject) => {
//         const query = 'SELECT * FROM tweets';
//         connect.query(query, (err, results) => {
//             if(err){
//                 reject(err)
//             } else {
//                 resolve(results)
//             }
//         })
//     })
// }

app.get('/tweets', tweetsRouter);
// app.get('/tweets', async (req, res) => {
// try{
//     const tweets = await getTweets()
//     res.status(200).json(tweets)
// }catch(err){
//     res.status(500).json( err)
// }
// })

app.listen(port, () => 
    console.log(`Server running at http://localhost:${port}`)
)
