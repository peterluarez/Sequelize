"use strict";
const { Model, Sequelize } = require("sequelize");
const sequelize = require("../../config/database"); 


const UserType = sequelize.define(
  "userType",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    }, 
    identifier: {
      allowNull: true,
      type: Sequelize.STRING(256),
    },
    text: {
      allowNull: false,
      type: Sequelize.STRING(256),
    },  
  },
  {
    underscored: true,
    timestamps: false,
    freezeTableName: true,
    modelName: "userType",
  }
);
 

module.exports = UserType;
