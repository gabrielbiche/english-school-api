'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Registrations extends Model {
    static associate(models) {
      Registrations.belongsTo(models.People, { foreignKey: 'student_id' })
      Registrations.belongsTo(models.Clazzes, { foreignKey: 'clazz_id' })
    }
  }
  Registrations.init(
    {
      status: DataTypes.STRING
    },
    {
      sequelize,
      paranoid: 'true',
      modelName: 'Registrations'
    }
  )
  return Registrations
}
