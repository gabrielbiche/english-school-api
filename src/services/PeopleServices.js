const Services = require('./Services')
const database = require('../models')

class PeopleServices extends Services {
  constructor() {
    super('People')
    this.registrations = new Services('Registrations')
  }

  async getAllPeople() {
    return database[this.model].scope('all').findAll()
  }

  async getOnePerson(id) {
    return database[this.model].scope('all').findOne({ where: { id: id } })
  }

  async updatePerson(data, id) {
    return database[this.model].scope('all').update(data, { where: { id: id } })
  }

  async deletePerson(id) {
    return database[this.model].scope('all').destroy({ where: { id: id } })
  }

  async cancelPerson(id) {
    return database.sequelize.transaction(async transaction => {
      await super.updateWithTransaction({ active: false }, id, {
        transaction: transaction
      })
      await this.registrations.updateWithTransaction(
        { status: 'cancel' },
        { student_id: id },
        { transaction: transaction }
      )
    })
  }

}

module.exports = PeopleServices
