const express = require('express');
const tweetsService = require('../services/tweetsService')
// const validate = require('../utils/validate')
const validation = require('../utils/middlewares/createValidationMiddleware')
const {createTweetSchema, tweetIdSchema, updateTweetSchema} = require('../utils/schemas/tweetsSchema')
const boom = require('@hapi/boom')
const cache = require('../utils/middlewares/createCacheMiddleware')

// Loaad cache middleware
const { ONE_MINUTE_IN_SECONDS, FIVE_MINUTES_IN_SECONDS } = require('../utils/time')
const router = express.Router()

router.get('/',cache(ONE_MINUTE_IN_SECONDS) ,getTweets);
router.post('/', validation({body: createTweetSchema}), createTweet);
router.get('/:tweetId', validation({params: tweetIdSchema}), cache(FIVE_MINUTES_IN_SECONDS), getTweet);
router.delete('/:tweetId', validation({params: tweetIdSchema}), deleteTweet);
router.patch(
    '/:tweetId', 
    validation({params: tweetIdSchema}),
    validation({body: updateTweetSchema}),
    updateTweet
)

module.exports = (app) => app.use('/tweets', router);

async function getTweets(req, res, next) {
    try {
        // throw new Error('This is an error from the tweet router')
        const tweets = await tweetsService.getTweets()
        res.status(200).json(tweets)
    } catch (err) {
        next(err)
    }
}

async function createTweet(req, res, next) {
    try {
        const tweet = req.body; 
        // const validateError = validate(tweet, createTweetSchema)

        // if (validateError) {
        //     return res
        //         .status(400)
        //         .json({error: validateError.details[0].message})
        // }

        const result  = await tweetsService.createTweet(tweet)
        res.status(201).json(result)
    } catch (err) {
        next(err)
    }
}

async function getTweet(req, res, next) {
    try {
        const {tweetId} = req.params; //tweetId
        const tweet = await tweetsService.getTweet(tweetId)
        res.status(200).json(tweet)
    } catch (err) {
       next(err) // res.status(500).json({ err: err.message })
    }
}


async function deleteTweet(req, res, next) {
    try {
        const { tweetId } = req.params; 
        const deleteRow = await tweetsService.deleteTweet(tweetId)

        if (deleteRow > 0 ){
            res.status(200).json({message: 'Tweet deleted successfully'})
        }else {
            res.status(404).json({message: 'Tweet not found'})
        }
        }catch (err) {
        next(err)// res.status(500).json({ err: err.message })
    }
}

async function updateTweet(req, res, next) {
    try {
        const { tweetId } = req.params; 
        const { content } = req.body;
        const updatedRow = await tweetsService.updateTweet(tweetId, content);

        if (updatedRow > 0 ){
            res.status(200).json({message: 'Tweet updated successfully'})
        }else {
            const { output: {statusCode, payload} } = boom.notFound()
            payload.message = "Tweet not found"
            res.status(statusCode).json(payload)
            // res.status(404).json({message: 'Tweet not found'})
        }
        }catch (err) {
        // res.status(500).json({ err: err.message })
            next(err);
    }
}