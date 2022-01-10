'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class People extends Model {
    static associate(models) {
      People.hasMany(models.Registrations, {
        foreignKey: 'student_id'
      })
      People.hasMany(models.Clazzes, { foreignKey: 'teacher_id' })
    }
  }
  People.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Please enter the name.'
          },
          len: {
            args: [4, 20],
            msg: 'The name must contain between 4 and 20 characters.'
          }
        }
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
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
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          validateRole: role => {
            if (role !== 'student' || role !== 'teacher') {
              throw new Error('Role accept: student or teacher.')
            }
          }
        }
      }
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
