'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Car, { foreignKey: 'createdBy', as: 'createdCars' });
      User.hasMany(models.Car, { foreignKey: 'updatedBy', as: 'updatedCars' });
      User.hasMany(models.Car, { foreignKey: 'deletedBy', as: 'deletedCars' });
    }

    static async hashPassword(password) {
      return await bcrypt.hash(password, 10);
    }

    async comparePassword(password) {
      return await bcrypt.compare(password, this.password);
    }
  }

  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [8, 100],
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      role: {
        type: DataTypes.ENUM('superadmin', 'admin', 'member'),
        allowNull: false,
        defaultValue: 'member',
        validate: {
          isIn: [['superadmin', 'admin', 'member']],
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [0, 255],
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isNumeric: true,
          len: [10, 15],
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
