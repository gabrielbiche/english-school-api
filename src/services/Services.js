const database = require('../models')

class Services {
  constructor(model) {
    this.model = model
  }

  async getAll(where = {}) {
    return database[this.model].findAll({ where: { ...where } })
  }

  async getOne(where = {}) {
    return database[this.model].findOne({ where: { ...where } })
  }

  async create(data) {
    return database[this.model].create(data)
  }

  async update(data, where, transaction = {}) {
    return database[this.model].update(
      data,
      { where: { ...where } },
      (transaction = {})
    )
  }

  async destroy(id) {
    return database[this.model].destroy({ where: { id: id } })
  }

  async restore(id) {
    return database[this.model].restore({ where: { id: id } })
  }

  async findAndCount(where, aggregators) {
    return database[this.model].findAndCountAll(
      { where: { ...where } },
      aggregators
    )
  }
}

module.exports = Services
