const { LevelsServices } = require('../services')
const levelsServices = new LevelsServices()

class LevelController {
  static async getAll(request, response) {
    try {
      const result = await levelsServices.getAll()
      return response.status(200).json(result)
    } catch (error) {
      return response.status(400).json({ Message: error.message })
    }
  }

  static async getOne(request, response) {
    const { id } = request.params
    try {
      const result = await levelsServices.getOne(Number(id))
      return response.status(200).json(result)
    } catch (error) {
      return response.status(400).json({ Message: error.message })
    }
  }

  static async create(request, response) {
    const { level_description } = request.body
    try {
      const result = await levelsServices.create({ level_description })
      return response.status(201).json(result)
    } catch (error) {
      return response.status(400).json({ Message: error.message })
    }
  }

  static async update(request, response) {
    const { id } = request.params
    const { level_description } = request.body
    try {
      await levelsServices.update({ level_description }, Number(id))
      return response.status(204).send()
    } catch (error) {
      return response.status(400).json({ Message: error.message })
    }
  }

  static async delete(request, response) {
    const { id } = request.params
    try {
      await levelsServices.destroy(Number(id))
      return response.status(204).send()
    } catch (error) {
      return response.status(400).json({ Message: error.message })
    }
  }
}

module.exports = LevelController
