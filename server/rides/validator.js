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

function validatelocation(params) {
    const schema = Joi.object().keys({
        lat:Joi.number().required(),
        longs:Joi.number().required(),
    });
    return validate(params, schema);
}
function validatebooking(params) {
    const schema = Joi.object().keys({
        userId: Joi.string().required(),
        riderId: Joi.string().required(),
    });
    return validate(params, schema);
}

module.exports = {
    validatelocation,
    validatebooking,
}