const { PeopleServices } = require('../services')

const peopleServices = new PeopleServices()

class PeopleController {
  static async getAllPeople(request, response) {
    try {
      const result = await peopleServices.getAllPeople()
      return response.status(200).json(result)
    } catch (error) {
      return response.status(400).json({ Message: message.error })
    }
  }

  static async getActivePeople(request, response) {
    try {
      const result = await peopleServices.getAll()
      return response.status(200).json(result)
    } catch (error) {
      return response.status(400).json({ Error: error.message })
    }
  }

  static async getAPerson(request, response) {
    const { id } = request.params
    try {
      const result = await peopleServices.getOnePerson(Number(id))
      return response.status(200).json(result)
    } catch (error) {
      return response.status(400).json({ Error: error.message })
    }
  }

  static async createPerson(request, response) {
    const data = request.body
    try {
      const result = await peopleServices.create(data)
      return response.status(201).json(result)
    } catch (error) {
      return response.status(400).json({ Error: error.message })
    }
  }

  static async updatePerson(request, response) {
    const { id } = request.params
    const data = request.body
    try {
      await peopleServices.updatePerson(data, Number(id))
      const result = await peopleServices.getOnePerson(Number(id))
      return response.status(200).json(result)
    } catch (error) {
      return response.status(400).json({ Error: error.message })
    }
  }

  static async deletePerson(request, response) {
    const { id } = request.params
    try {
      await peopleServices.deletePerson(Number(id))
      return response
        .status(200)
        .json({ Message: `People with id: ${id} deleted` })
    } catch (error) {
      return response.status(400).json({ Error: error.message })
    }
  }

  static async restorePerson(request, response) {
    const { id } = request.params
    try {
      await peopleServices.restore(Number(id))
      return response
        .status(200)
        .json({ Message: `Person with id: ${id} restored` })
    } catch (error) {
      return response.status(400).json({ Message: error.message })
    }
  }

  static async cancelPerson(request, response) {
    const { studentId } = request.params
    try {
      await peopleServices.cancelPerson(Number(studentId))
      return response.status(200).json({
        Message: `Registration the person with id: ${studentId} canceled`
      })
    } catch (error) {
      return response.status(400).json({ Message: error.message })
    }
  }

}

module.exports = PeopleController
