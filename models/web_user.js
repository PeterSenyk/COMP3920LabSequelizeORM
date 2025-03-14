const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../databaseConnectionSequelize');

const userModel = sequelize.define('web_user', {
    web_user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        // unique: true
    },
    password_hash: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'web_user',
    timestamps: false
});

module.exports = userModel;