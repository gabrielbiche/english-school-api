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

  async cancelPerson(id) {
    return database.sequelize.transaction(async transaction => {
      await super.update({ active: false }, id, { transaction: transaction })
      await this.registrations.update(
        { status: 'cancel' },
        { student_id: id },
        { transaction: transaction }
      )
    })
  }

  async getAllEnrollmentsFromOnePerson(where = {}) {
    const matriculations = await database[this.model].findOne({
      where: { ...where }
    })
    return matriculations.getEnrolledClazzes()
  }
}

module.exports = PeopleServices
