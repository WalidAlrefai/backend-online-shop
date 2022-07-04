'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

const userModel = require('./user.model')
const itemModel = require('./item.model')

const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL; 

let sequelizeOptions = process.env.NODE_ENV === 'production' ? {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        }
    }
} : {};

const sequelize = new Sequelize(DATABASE_URL, sequelizeOptions);

let UserModel = userModel(sequelize, DataTypes);
let ItemModel = itemModel(sequelize, DataTypes);

UserModel.hasMany(ItemModel);
ItemModel.belongsTo(UserModel);

module.exports = {
    db: sequelize,
    userModel: UserModel,
    itemModel: ItemModel,
};
