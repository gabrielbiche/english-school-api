'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Levels extends Model {
    static associate(models) {
      Levels.hasMany(models.Clazzes, { foreignKey: 'level_id' })
    }
  }
  Levels.init(
    {
      level_description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: {
            args: /[^\d]/,
            msg: 'The level description must be expressed in string only.'
          },
          notEmpty: {
            msg: 'Please enter the level description.'
          },
          len: {
            args: [4, 20],
            msg: 'The level description must contain between 4 and 20 characters.'
          }
        }
      }
    },
    {
      sequelize,
      paranoid: 'true',
      modelName: 'Levels'
    }
  )
  return Levels
}
