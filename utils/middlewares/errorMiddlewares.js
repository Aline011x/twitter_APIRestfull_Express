const config = require('../../config');
const boom = require('@hapi/boom');
const withErrorStack = require('../withErrorStack');


function logError(err, req, res, next) {
    console.error(err);
    next(err);
}

function wrapError(err, req, res, next) {

    if (!err.isBoom) {
        next(boom.badImplementation(err));
    }
    // const badImplementation = {
    //     stack: err.stack, 
    //     output: {
    //         statusCode: 500, 
    //         payload: {
    //             error: "Internal Server Error",
    //             message: err.message, 
    //         }
    //     }
    // }

    next(err);

}

function errorHandler(err, req, res, next) {
    const { stack, output } = err;
    res.status(output.statusCode)
    res.json(withErrorStack(output.payload, stack));
}

module.exports ={
    logError, 
    wrapError,
    errorHandler,
}