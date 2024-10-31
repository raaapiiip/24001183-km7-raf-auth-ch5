'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    static associate(models) {
      Car.belongsTo(models.User, { foreignKey: 'createdBy', as: 'userCreate' });
      Car.belongsTo(models.User, { foreignKey: 'updatedBy', as: 'userUpdate' });
      Car.belongsTo(models.User, { foreignKey: 'deletedBy', as: 'userDelete' });
    }
  }
  Car.init(
    {
      brand: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      model: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      year: {
        type: DataTypes.INTEGER,
      },
      plateNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL,
      },
      carImage: DataTypes.TEXT,
      createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      updatedBy: {
        type: DataTypes.INTEGER,
        references: {
          model: 'User',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      deletedBy: {
        type: DataTypes.INTEGER,
        references: {
          model: 'User',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
    },
    {
      sequelize,
      modelName: 'Car',
    }
  );
  return Car;
};
