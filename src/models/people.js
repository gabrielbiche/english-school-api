'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class People extends Model {
    static associate(models) {
      People.hasMany(models.Registrations, {
        foreignKey: 'student_id',
        scope: { status: 'active' },
        as: 'enrolledClazzes'
      })
      People.hasMany(models.Clazzes, { foreignKey: 'teacher_id' })
    }
  }
  People.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          len: [2, 10]
        }
      },
      active: DataTypes.BOOLEAN,
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            args: true,
            msg: 'Invalid e-mail data type'
          }
        }
      },
      role: DataTypes.STRING
    },
    {
      defaultScope: {
        where: {
          active: true
        }
      },
      scopes: {
        all: { where: {} }
      },
      sequelize,
      paranoid: 'true',
      modelName: 'People'
    }
  )
  return People
}
