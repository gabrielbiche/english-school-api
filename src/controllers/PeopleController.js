const { PeopleServices } = require('../services')

const peopleServices = new PeopleServices()

class PeopleController {
  static async getAll(request, response) {
    try {
      const result = await peopleServices.getAllPeople()
      return response.status(200).json(result)
    } catch (error) {
      return response.status(400).json({ Message: error.message })
    }
  }

  static async getActivePeople(request, response) {
    try {
      const result = await peopleServices.getAll()
      return response.status(200).json(result)
    } catch (error) {
      return response.status(400).json({ Message: error.message })
    }
  }

  static async getOne(request, response) {
    const { id } = request.params
    try {
      const result = await peopleServices.getOnePerson(Number(id))
      return response.status(200).json({
        name: result.name,
        active: result.active,
        email: result.email,
        role: result.role
      })
    } catch (error) {
      return response.status(400).json({ Message: error.message })
    }
  }

  static async create(request, response) {
    const { name, active, email, role } = request.body
    try {
      const result = await peopleServices.create({ name, active, email, role })
      return response.status(201).json({
        id: result.id,
        name: result.name,
        active: result.active,
        email: result.email,
        role: result.role
      })
    } catch (error) {
      return response.status(400).json({ Message: error.message })
    }
  }

  static async update(request, response) {
    const { id } = request.params
    const { name, active, email, role } = request.body
    try {
      await peopleServices.updatePerson(
        { name, active, email, role },
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
      await peopleServices.deletePerson(Number(id))
      return response.status(204).send()
    } catch (error) {
      return response.status(400).json({ Message: error.message })
    }
  }

  static async restorePerson(request, response) {
    const { id } = request.params
    try {
      await peopleServices.restore(Number(id))
      return response.status(204).send()
    } catch (error) {
      return response.status(400).json({ Message: error.message })
    }
  }

  static async cancelPerson(request, response) {
    const { studentId } = request.params
    try {
      await peopleServices.cancelPerson(Number(studentId))
      return response.status(204).send()
    } catch (error) {
      return response.status(400).json({ Message: error.message })
    }
  }
}

module.exports = PeopleController
