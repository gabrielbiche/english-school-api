const { RegistrationsServices } = require('../services')
const registrationsServices = new RegistrationsServices()

class RegistrationController {
  static async getARegistration(request, response) {
    const { studentId, registrationId } = request.params
    try {
      const result = await registrationsServices.getOne({
        id: Number(registrationId),
        student_id: Number(studentId)
      })
      return response.status(200).json(result)
    } catch (error) {
      return response.status(400).json({ Message: error.message })
    }
  }

  static async createRegistration(request, response) {
    const { studentId } = request.params
    const data = { ...request.body, student_id: Number(studentId) }
    try {
      const result = await registrationsServices.create(data)
      return response.status(201).json(result)
    } catch (error) {
      console.log(error)
      return response.status(400).json({ Message: error.message })
    }
  }

  static async updateRegistration(request, response) {
    const { studentId, registrationId } = request.params
    const data = request.body
    try {
      await registrationsServices.update(data, {
        id: Number(registrationId),
        student_id: Number(studentId)
      })
      const result = await registrationsServices.getOne({
        id: Number(registrationId),
        student_id: Number(studentId)
      })
      return response.status(200).json(result)
    } catch (error) {
      return response.status(400).json({ Message: error.message })
    }
  }

  static async deleteRegistration(request, response) {
    const { studentId, registrationId } = request.params
    try {
      await registrationsServices.destroy({
        id: Number(registrationId),
        student_id: Number(studentId)
      })
      return response
        .status(200)
        .json({ Message: `Registration with id: ${registrationId} deleted` })
    } catch (error) {
      return response.status(400).json({ Message: error.message })
    }
  }

  static async getAllRegistrationsFromOneClazz(request, response) {
    const { clazzId } = request.params
    try {
      const result = await registrationsServices.findAndCount(
        {
          clazz_id: Number(clazzId),
          status: 'active'
        },
        {
          limit: 20,
          order: [['clazz_id', 'ASC']]
        }
      )
      return response.status(200).json(result)
    } catch (error) {
      return response.status(400).json({ Message: error.message })
    }
  }
}

module.exports = RegistrationController
