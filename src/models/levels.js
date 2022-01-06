'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Levels extends Model {
    static associate(models) {
      Levels.hasMany(models.Clazzes, { foreignKey: 'level_id'})
    }
  }
  Levels.init(
    {
      level_description: DataTypes.STRING
    },
    {
      sequelize,
      paranoid: 'true',
      modelName: 'Levels'
    }
  )
  return Levels
}
