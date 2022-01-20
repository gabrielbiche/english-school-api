'use strict'
const bcrypt = require('bcrypt')

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
        unique: true,
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
          }
        }
      }
    },
    {
      sequelize,
      modelName: 'Users',
      hooks: {
        beforeCreate: user => {
          if (user.password.length < 8)
            throw new Error('Password must contain at least 8 characters.')
          const saltRounds = 12
          user.password = bcrypt.hashSync(user.password, saltRounds)
        },
        beforeUpdate: user => {
          const saltRounds = 12
          user.password = bcrypt.hashSync(user.password, saltRounds)
        }
      }
    }
  )
  return Users
}
