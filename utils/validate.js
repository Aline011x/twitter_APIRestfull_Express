const joi = require('@hapi/joi')

function validate(data, schema){
    const { err } = joi.object(schema).validate(data)
    return err
}

module.exports = validate; 