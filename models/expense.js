const Sequelize = require('sequelize');

const sequelize = require('../database');

const user_expance = sequelize.define('user_expance', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false
    },
    amount: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    balance: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  });

  module.exports = user_expance;