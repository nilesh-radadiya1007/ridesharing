'use strict';

const router = require('express').Router();
const userValidator = require(`./validator`);
const userFactory = require('./index');

router.post('/signup', async (req, res) => {
    const params = req.body;

    let validateSignupResp = await userValidator.validateSignup(params);
    if (validateSignupResp.status == 'error') return res.status(500).send(validateSignupResp).end();

    const { firstName, lastName, email, password, address, city, state, lat, long } = req.body;
    const userSignupResp = await userFactory.userSignup(firstName, lastName, email, password, address, city, state, lat, long);
    res.send(userSignupResp)

})
router.post('/login', async (req, res) => {
    const params = req.body;

    let validateLoginResp = await userValidator.validateUser(params);
    if (validateLoginResp.status == 'error') return res.status(500).send(validateLoginResp).end();

    const { email, password } = req.body;
    const userLoginResp = await userFactory.checkUserLogin(email, password);
    res.send(userLoginResp)
})



module.exports = router;