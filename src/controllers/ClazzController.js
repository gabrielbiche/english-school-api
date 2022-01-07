const Sequelise = require('sequelize')
const Op = Sequelise.Op

const { ClazzesServices } = require('../services')
const clazzesServices = new ClazzesServices()

class ClazzController {
  static async getAllClazzes(request, response) {
    const { start_date, finish_date } = request.query
    const where = {}
    start_date || finish_date ? (where.start_date = {}) : null
    start_date ? (where.start_date[Op.gte] = start_date) : null
    finish_date ? (where.start_date[Op.lte] = finish_date) : null
    try {
      const result = await clazzesServices.getAll(where)
      return response.status(200).json(result)
    } catch (error) {
      return response.status(400).json({ Message: error.message })
    }
  }

  static async getOneClazz(request, response) {
    try {
      const { id } = request.params
      const result = await clazzesServices.getOne(Number(id))
      return response.status(200).json(result)
    } catch (error) {
      return response.status(400).json({ Message: error.message })
    }
  }

  static async createClazz(request, response) {
    try {
      const data = request.body
      const result = await clazzesServices.create(data)
      return response.status(201).json(result)
    } catch (error) {
      return response.status(400).json({ Message: error.message })
    }
  }

  static async updateClazz(request, response) {
    try {
      const { id } = request.params
      const data = request.body
      await clazzesServices.update(data, Number(id))
      const result = await clazzesServices.getOne(Number(id))
      return response.status(200).json(result)
    } catch (error) {
      return response.status(400).json({ Message: error.message })
    }
  }

  static async deleteClazz(request, response) {
    try {
      const { id } = request.params
      await clazzesServices.destroy(Number(id))
      return response
        .status(200)
        .json({ Message: `Class with id: ${id} deleted` })
    } catch (error) {
      return response.status(200).json({ Message: error.message })
    }
  }
}

module.exports = ClazzController
