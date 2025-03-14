const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../databaseConnectionSequelize'); // Corrected import
const UserModel = require('./web_user'); // Corrected import method

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
            model: 'web_user', // Table name in DB
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
            model: 'pet_type', // Table name in DB
            key: 'pet_type_id'
        }
    }
}, {
    tableName: 'pet',
    timestamps: false
});

// Define relationships AFTER defining models
PetModel.belongsTo(UserModel, { as: 'owner', foreignKey: 'web_user_id' });
UserModel.hasMany(PetModel, { as: 'pets', foreignKey: 'web_user_id' });

module.exports = PetModel; // Export AFTER defining relationships
