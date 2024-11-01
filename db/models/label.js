"use strict";
const { Model, Sequelize } = require("sequelize");
const sequelize = require("../../config/database"); 


const Label = sequelize.define(
  "label",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.BIGINT,
    },
    type: {
      allowNull: false,
      type: Sequelize.STRING(256),
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
    modelName: "label",
  }
);
 

module.exports = Label;
