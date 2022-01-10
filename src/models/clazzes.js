'use strict'

const moment = require('moment')

const { Model, Sequelize } = require('sequelize')

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
      start_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Please enter start date.'
          },
          validateEntryDate: date => {
            const currentDate = moment()
            const validDate = moment(date).isSameOrAfter(currentDate, 'month')
            if (!validDate) {
              throw new Error(
                'The starting date of the class must be the same month as the current month or later.'
              )
            }
          }
        }
      }
    },
    {
      sequelize,
      paranoid: 'true',
      modelName: 'Clazzes'
    }
  )
  return Clazzes
}
