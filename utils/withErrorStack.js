const config = require('../config')

function withErrorStack(err, stack,  _isStackShown = config.dev) {
    if (_isStackShown) {
        return { ...err, stack}
    }
    return err; 
}


module.exports = withErrorStack;