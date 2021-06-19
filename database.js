 const Sequelize = require('sequelize');

 const sequelize = new Sequelize('expense_tracker', 'root', 'khushter', {
   dialect: 'mysql',
   host: 'localhost'
 });

 module.exports = sequelize;
 //module.exports=db;
