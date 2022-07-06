'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

const userModel = require('./user.model')
const itemModel = require('./item.model')
// const commentModel = require('./comment.model')
const favoriteModel = require('./favorite.model')

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
// let CommentModel = commentModel(sequelize, DataTypes);
let FavoriteModel = favoriteModel(sequelize, DataTypes);

UserModel.hasMany(ItemModel);
ItemModel.belongsTo(UserModel);

UserModel.hasMany(FavoriteModel);
FavoriteModel.belongsTo(UserModel);

// UserModel.hasMany(CommentModel)
// CommentModel.belongsTo(UserModel)

// ItemModel.hasMany(CommentModel)
// CommentModel.belongsTo(ItemModel)


module.exports = {
    db: sequelize,
    userModel: UserModel,
    itemModel: ItemModel,
    // commentModel: CommentModel,
    favoriteModel: FavoriteModel,
};
