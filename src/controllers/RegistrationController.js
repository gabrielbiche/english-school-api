const { RegistrationsServices } = require('../services')
const registrationsServices = new RegistrationsServices()

class RegistrationController {
  static async getOne(request, response) {
    const { studentId, registrationId } = request.params
    try {
      const result = await registrationsServices.getOneRegistration({
        id: Number(registrationId),
        student_id: Number(studentId)
      })
      return response.status(200).json({
        id: result.id,
        status: result.status,
        student_id: result.student_id,
        clazz_id: result.clazz_id
      })
    } catch (error) {
      return response.status(400).json({ Message: error.message })
    }
  }

  static async create(request, response) {
    const { studentId } = request.params
    const { status, clazz_id } = request.body
    try {
      const result = await registrationsServices.create({
        status,
        student_id: Number(studentId),
        clazz_id
      })
      return response.status(201).json({
        id: result.id,
        status: result.status,
        student_id: result.student_id,
        clazz_id: result.clazz_id
      })
    } catch (error) {
      console.log(error)
      return response.status(400).json({ Message: error.message })
    }
  }

  static async update(request, response) {
    const { studentId, registrationId } = request.params
    const { status, student_id, clazz_id } = request.body
    try {
      await registrationsServices.updateRegistrations(
        { status, student_id, clazz_id },
        {
          id: Number(registrationId),
          student_id: Number(studentId)
        }
      )
      return response.status(204).send()
    } catch (error) {
      return response.status(400).json({ Message: error.message })
    }
  }

  static async delete(request, response) {
    const { studentId, registrationId } = request.params
    try {
      await registrationsServices.deleteRegistration({
        id: Number(registrationId),
        student_id: Number(studentId)
      })
      return response.status(204).send()
    } catch (error) {
      return response.status(400).json({ Message: error.message })
    }
  }

  static async getRegistrationsPerClass(request, response) {
    const { classeId } = request.params
    try {
      const result = await registrationsServices.findAndCountRegistrations(
        {
          clazz_id: Number(classeId),
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
