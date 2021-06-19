const express = require('express');
const app=express();
const mysql=require('mysql2')
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
var cors=require('cors');
const dotenv=require('dotenv');

const sequelize = require('./database');
const User = require('./models/user');
const expance=require('./models/expense');

const adminRouter=require('./Router/admin');
//const { HasMany } = require('sequelize');
dotenv.config();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json()); 

app.use(adminRouter);


User.hasMany(expance);
expance.belongsTo(User);

sequelize.sync()
    .then(() => {
        app.listen(5000);
    })
    .catch(err => {
        console.log(err);
    });
