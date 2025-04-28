const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Item = sequelize.define('Item', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  category: { type: DataTypes.STRING, allowNull: false }, // Electronics, Furniture, Stationery
  description: { type: DataTypes.STRING },
  price: { type: DataTypes.FLOAT, allowNull: false },
});

module.exports = Item;
