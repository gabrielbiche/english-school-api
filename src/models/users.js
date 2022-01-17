'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {}
  }
  Users.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: {
            args: true,
            msg: 'Invalid e-mail data type.'
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Please enter a password.'
          },
          len: {
            args: [8, 20],
            msg: 'The password must contain between 8 and 20 characters.'
          }
        }
      }
    },
    {
      sequelize,
      modelName: 'Users'
    }
  )
  return Users
}
