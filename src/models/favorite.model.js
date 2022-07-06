'use strict';
const Favorite = (sequelize, DataTypes) => sequelize.define('favorite', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    itemName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    itemImage: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    itemDescription: {
        type: DataTypes.STRING(1000),
    },
    itemPrice:{
        type : DataTypes.INTEGER,
    }
});
module.exports = Favorite;