const database = require('../models')

class Services {
  constructor(model) {
    this.model = model
  }

  async getAll() {
    return database[this.model].findAll()
  }

  async getOne(id) {
    return database[this.model].findOne({ where: { id: id } })
  }

  async create(data) {
    return database[this.model].create(data)
  }

  async update(data, id) {
    return database[this.model].update(data, { where: { id: id } })
  }

  async updateWithTransaction(data, where, transaction) {
    return database[this.model].update(
      data,
      { where: { ...where } },
      transaction
    )
  }

  async destroy(id) {
    return database[this.model].destroy({ where: { id: id } })
  }

  async restore(id) {
    return database[this.model].restore({ where: { id: id } })
  }
}

module.exports = Services
