'use strict';

const  Comment =(sequelize,DataTypes)=> sequelize.define('comment',{
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,

    },
    commentContent:{
        type :DataTypes.STRING(10000),
    },
    userName :{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
})
module.exports= Comment