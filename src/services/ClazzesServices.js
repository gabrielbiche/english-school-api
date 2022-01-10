const Services = require('./Services')
const database = require('../models')

class ClazzesServices extends Services {
  constructor() {
    super('Clazzes')
  }

  async getAllClazzes(where = {}) {
    return database[this.model].findAll({ where: { ...where } })
  }
}

module.exports = ClazzesServices
