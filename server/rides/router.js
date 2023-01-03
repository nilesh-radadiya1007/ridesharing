'use strict';

const router = require('express').Router();
const riderValidator = require(`./validator`);
const riderFactory = require('./index');

router.post('/findrides', async (req, res) => {
    const params = req.body;
    let validateSignupResp = await riderValidator.validatelocation(params);
    if (validateSignupResp.status == 'error') return res.status(500).send(validateSignupResp).end();

    const { lat, longs } = req.body;
    const ridesDataResp = await riderFactory.getRidersDetails(lat, longs);
    res.send(ridesDataResp)

})
router.post('/bookrides', async (req, res) => {
    const params = req.body;
    let validateSignupResp = await riderValidator.validatebooking(params);
    if (validateSignupResp.status == 'error') return res.status(500).send(validateSignupResp).end();

    const { userId,riderId } = req.body;
    const bookingRidesResp = await riderFactory.ridebooking(userId,riderId);
    res.send(bookingRidesResp)

})
router.post('/cancelrides', async (req, res) => {
    const { userId,riderId } = req.body;
    const cancelRidesResp = await riderFactory.cancelbooking(userId,riderId);
    res.send(cancelRidesResp)

})

module.exports = router;