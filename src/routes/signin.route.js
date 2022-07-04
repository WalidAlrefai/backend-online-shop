'use strict';
const basicAuth = require('../middlewares/basic');

const router = require('express').Router();

router.post('/signin', basicAuth, async (req, res) => {
    res.status(200).json({
        "userInfo":req.User,
    });
});
module.exports = router;