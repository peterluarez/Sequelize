"use strict";
const { Model, Sequelize } = require("sequelize");
const sequelize = require("../../config/database");
const useBcrypt = require("sequelize-bcrypt");


const User = sequelize.define(
  "user",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.BIGINT,
    },
    firstName: {
      allowNull: false,
      type: Sequelize.STRING(256),
    },
    middleName: {
      allowNull: true,
      type: Sequelize.STRING(256),
    },
    lastName: {
      allowNull: false,
      type: Sequelize.STRING(256),
    },
    email: {
      allowNull: false,
      type: Sequelize.STRING(256),
    },
    mobileNumber: {
      type: Sequelize.INTEGER,
    }, 
    votersIdNumber: {
      type: Sequelize.INTEGER,
    }, 
    password: {
      allowNull: false,
      type: Sequelize.STRING(256),
    },
    
  },
  {
    underscored: true,
    timestamps: false,
    freezeTableName: true,
    modelName: "user",
  }
);

const hashPassword = {
  field: "password",
  rounds: 10,
  compare: "authenticate",
};

useBcrypt(User, hashPassword);
 

module.exports = User;
