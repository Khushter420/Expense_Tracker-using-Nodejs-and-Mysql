const user_expance = require('../models/expense');
const dotenv=require('dotenv')


exports.Addexpense = (req, res, next) => {
    console.log(req.body);
       const description= req.body.description;
       const amount = req.body.amount;
      user_expance.create({
      description:description,
      amount:amount
     })
     .then(result => {
       // console.log(result);
       console.log('Created Product');
       res.redirect('/');
     })
     .catch(err => {
       console.log(err);
     });
    };