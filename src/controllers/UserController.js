const jwt = require('jsonwebtoken')

const blacklist = require('../../redis/manipulateBlacklist')
const { UsersServices } = require('../services')

const usersServices = new UsersServices()

class UserController {
  static async create(request, response) {
    const { email, password } = request.body
    try {
      await usersServices.create({
        email: email,
        password: password
      })
      return response.status(201).send()
    } catch (error) {
      console.log(error)
      return response.status(400).json({ Message: error.message })
    }
  }

  static login(request, response) {
    const token = UserController.generateTokenJwt(request.user)
    return response.set('Authorization', token).status(204).send()
  }

  static async logout(request, response) {
    try {
      const token = request.token
      await blacklist.addToken(token)
      return response.status(204).send()
    } catch (error) {
      return response.status(400).json({ Message: error.message })
    }
  }

  static async delete(request, response) {
    const { id } = request.params
    try {
      await usersServices.destroy(Number(id))
      return response.status(204).send()
    } catch (error) {
      return response.status(400).json({ Message: error.message })
    }
  }

  static generateTokenJwt(user) {
    const payload = {
      id: user.id
    }
    const token = jwt.sign(payload, process.env.CHAVE_JWT, { expiresIn: '15m' })
    return token
  }
}

module.exports = UserController
