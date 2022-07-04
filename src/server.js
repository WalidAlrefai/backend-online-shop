'use strict';
const cors = require('cors');
require('dotenv').config();

const notFoundHandler = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');
const signup = require('./routes/signup.route');
const signin = require('./routes/signin.route');
const item = require('./routes/item.route')



const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.status(200).send('Home Route!');
});
app.use(cors());
app.use(express.json());
app.use(signup);
app.use(signin);
app.use(item);


app.use(notFoundHandler)
app.use(errorHandler)

function start(port){
    app.listen(port,()=>{
        console.log(`Server is A live on port ${port}`);
    })
}


module.exports ={
    app:app,
    start:start,
}