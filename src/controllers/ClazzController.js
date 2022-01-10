const Sequelise = require('sequelize')
const Op = Sequelise.Op

const { ClazzesServices } = require('../services')
const clazzesServices = new ClazzesServices()

class ClazzController {
  static async getAll(request, response) {
    const { start_date, finish_date } = request.query
    const where = {}
    start_date || finish_date ? (where.start_date = {}) : null
    start_date ? (where.start_date[Op.gte] = start_date) : null
    finish_date ? (where.start_date[Op.lte] = finish_date) : null
    try {
      const result = await clazzesServices.getAllClazzes(where)
      return response.status(200).json(result)
    } catch (error) {
      return response.status(400).json({ Message: error.message })
    }
  }

  static async getOne(request, response) {
    const { id } = request.params
    try {
      const result = await clazzesServices.getOne(Number(id))
      return response.status(200).json({
        id: result.id,
        start_date: result.start_date,
        teacher_id: result.teacher_id,
        level_id: result.level_id
      })
    } catch (error) {
      return response.status(400).json({ Message: error.message })
    }
  }

  static async create(request, response) {
    const { start_date, teacher_id, level_id } = request.body
    try {
      const result = await clazzesServices.create({
        start_date,
        teacher_id,
        level_id
      })
      return response.status(201).json({
        id: result.id,
        start_date: result.start_date,
        teacher_id: result.teacher_id,
        level_id: result.level_id
      })
    } catch (error) {
      return response.status(400).json({ Message: error.message })
    }
  }

  static async update(request, response) {
    const { id } = request.params
    const { start_date, teacher_id, level_id } = request.body
    try {
      await clazzesServices.update(
        {
          start_date,
          teacher_id,
          level_id
        },
        Number(id)
      )
      return response.status(204).send()
    } catch (error) {
      return response.status(400).json({ Message: error.message })
    }
  }

  static async delete(request, response) {
    const { id } = request.params
    try {
      await clazzesServices.destroy(Number(id))
      return response.status(204).send()
    } catch (error) {
      return response.status(200).json({ Message: error.message })
    }
  }
}

module.exports = ClazzController
