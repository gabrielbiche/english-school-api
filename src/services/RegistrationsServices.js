const Services = require('./Services')
const database = require('../models')

class RegistrationsServices extends Services {
  constructor() {
    super('Registrations')
  }

  async getOneRegistration(where) {
    return database[this.model].findOne({ where: { ...where } })
  }

  async updateRegistrations(data, where) {
    return database[this.model].update(data, { where: { ...where } })
  }

  async findAndCountRegistrations(where, aggregators) {
    return database[this.model].findAndCountAll(
      { where: { ...where } },
      aggregators
    )
  }

  async deleteRegistration(where){
    return database[this.model].destroy({ where: { ...where } })
  }
}

module.exports = RegistrationsServices
