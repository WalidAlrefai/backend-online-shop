'use strict'
const express = require("express");
const { userModel } = require("../models/index");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/signup", async (req, res) => {

    let { userName, email, password,firstName,lastName } = req.body;
    let hashed = await bcrypt.hash(password, 5);
    console.log("hashed", hashed);
    let newUser = await userModel.create({
        userName: userName,
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: hashed,
    });
    res.status(201).json({ "New User": newUser })
})
module.exports = router;