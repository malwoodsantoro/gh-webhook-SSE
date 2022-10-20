const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");
const { Sequelize } = require("sequelize");

Shipment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    containerId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    carrierScac: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    timestamps: true,
  }
);

module.exports = {
  Shipment,
};