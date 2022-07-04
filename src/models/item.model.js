'use strict';
const Item = (sequelize, DataTypes) => sequelize.define('item', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    itemName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
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
module.exports = Item;