const { Sequelize, DataTypes } = require('sequelize');
const databaseConnectionString = require('/databaseConnectionSequelize'); // Ensure this is correct
const sequelize = new Sequelize(databaseConnectionString);

const PetModel = sequelize.define('pet', {
    pet_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    web_user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'web_user', // Table name
            key: 'web_user_id'
        }
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    pet_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'pet_type', // Table name
            key: 'pet_type_id'
        }
    }
}, {
    tableName: 'pet',
    timestamps: false
});

module.exports = PetModel;
