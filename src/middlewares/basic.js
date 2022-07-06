"use strict";
require('dotenv').config();
const base64 = require('base-64');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET || "anything";
const { userModel} = require('../models/index');
const bcrypt = require('bcrypt');

const basicAuth = async (req, res, next) => {
    let basicAuthText = req.headers.authorization;
    try{
        if(!basicAuthText){
            throw new Error('No authorization header');
        }
        let basicAuth = base64.decode(basicAuthText.split(' ')[1]);
        let [userName, password] = basicAuth.split(':');
        let User = await userModel.findOne({where: { userName: userName }});
        if(!User){
            throw new Error('User not found');
        }
        let isValid = await bcrypt.compare(password, User.password);
        if(!isValid){
            throw new Error('Invalid password');
        }
        let newToken = jwt.sign({userName:User.userName},SECRET,{expiresIn : '365d'});
        // res.setHeader('Authorization', `Bearer ${token}`);
        User.token = newToken;
        req.User = User
        next();
    } catch (error) {
        console.error(`${error}`)
        res.status(403).send('invalid sign in UserName')
    }
}
module.exports = basicAuth;