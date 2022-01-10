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
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [['active', 'inactive']],
            msg: 'Status accepted: active or inactive.'
          }
        }
      }
    },
    {
      sequelize,
      paranoid: 'true',
      modelName: 'Registrations'
    }
  )
  return Registrations
}
