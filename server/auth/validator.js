const { func } = require('joi')
const Joi = require('joi')

function validate(params, schema) {
    const validateResult = schema.validate(params)
    if (!validateResult.error) return validateResult
    const validateResp = { status: 'error', errors: [], error: true }
    fillRespWithErrors(validateResp, validateResult)
    return validateResp
}

function fillRespWithErrors(resp, errorObj) {
    for (let error of errorObj.error.details) {
        resp.errors.push(error.message)
    }
}

function validateUser(params) {
    const schema = Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });
    return validate(params, schema);
}

function validateSignup(params) {
    const schema = Joi.object().keys({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        address:Joi.string().required(),
        city:Joi.string().required(),
        state:Joi.string().required(),
        lat:Joi.number().required(),
        long:Joi.number().required(),
    });
    return validate(params, schema);
}


module.exports = {
    validateUser,
    validateSignup,
}