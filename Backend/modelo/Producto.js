const { DataTypes } = require('sequelize');
const sequelize = require('../conexion/database');


const Producto = sequelize.define('producto', {
    partNumber: {
        type: DataTypes.STRING,
        primaryKey: true 
    },
    productType: {
        type: DataTypes.STRING
    },
    categoryCode: {
        type: DataTypes.STRING
    },
    brandCode: {
        type: DataTypes.STRING
    },
    familyCode: {
        type: DataTypes.STRING
    },
    lineCode: {
        type: DataTypes.STRING
    },
    productSegmentCode: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.STRING
    },
    
    value: {
        type: DataTypes.FLOAT
    },
    valueCurrency: {
        type: DataTypes.STRING
    },
    defaultQuantityUnits: {
        type: DataTypes.STRING
    },
    name: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING(1000)
    },
    plannerCode: {
        type: DataTypes.STRING
    },
    sourceLink: {
        type: DataTypes.STRING
    },
}, {
    tableName: 'producto', 
    timestamps: false     
});

module.exports = Producto;
