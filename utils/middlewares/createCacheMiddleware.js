const config = require('../../config')

function createCacheMiddleware(seconds, _isCacheActive= !config.dev) {
    return function cacheMiddleware(req, res, next) {
        if (_isCacheActive) {
            res.setHeader('Cache-Control', `public, max-age=${seconds}`)
        }
        next()
    }
}

module.exports = createCacheMiddleware;