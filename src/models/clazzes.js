'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Clazzes extends Model {
    static associate(models) {
      Clazzes.hasMany(models.Registrations, { foreignKey: 'clazz_id' })
      Clazzes.belongsTo(models.People, { foreignKey: 'teacher_id' })
      Clazzes.belongsTo(models.Levels, { foreignKey: 'level_id' })
    }
  }
  Clazzes.init(
    {
      start_date: DataTypes.DATEONLY
    },
    {
      sequelize,
      paranoid: 'true',
      modelName: 'Clazzes'
    }
  )
  return Clazzes
}
