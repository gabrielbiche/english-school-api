const { LevelsServices } = require('../services')
const levelsServices = new LevelsServices()

class LevelController {
  static async getAllLevels(request, response) {
    try {
      const result = await levelsServices.getAll()
      return response.status(200).json(result)
    } catch (error) {
      return response.status(400).json({ Message: error.message })
    }
  }

  static async getALevel(request, response) {
    try {
      const { id } = request.params
      const result = await levelsServices.getOne(Number(id))
      return response.status(200).json(result)
    } catch (error) {
      return response.status(400).json({ Message: error.message })
    }
  }

  static async createLevel(request, response) {
    try {
      const data = request.body
      const result = await levelsServices.create(data)
      return response.status(201).json(result)
    } catch (error) {
      return response.status(400).json({ Message: error.message })
    }
  }

  static async updateLevel(request, response) {
    try {
      const { id } = request.params
      const data = request.body
      await levelsServices.update(data, Number(id))
      const result = await levelsServices.getOne(Number(id))
      return response.status(200).json(result)
    } catch (error) {
      return response.status(400).json({ Message: error.message })
    }
  }

  static async deleteLevel(request, response) {
    try {
      const { id } = request.params
      await levelsServices.destroy(Number(id))
      return response
        .status(200)
        .json({ Message: `Level with id: ${id} deleted` })
    } catch (error) {
      return response.status(400).json({ Message: error.message })
    }
  }
}

module.exports = LevelController
