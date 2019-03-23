const IDb = require('../base/interfaceDB')
const Sequelize = require('sequelize')
const User = require('./entities/user')

class PostgreSQLStrategy extends IDb {
  constructor() {
    super()
    this._sequelize = null
    this.model = {
      'users': null,
      'customer': null,
      'store': null,
      'wallet': null,
      'transaction': null
    }
  }

  logError(error){
    console.log("POSTGRESQL_STRATEGY::INTERNAL_ERROR: ", error)
  }

  async defineModel() {
    this.model.users = new User(this._sequelize)
  }

  async connect() {
    this._sequelize = new Sequelize(
      'mmldata',      //database
      'mmlserver',    // user
      'mml20022019',  //senha
      {
        host: 'localhost',
        dialect: 'postgres',
        quoteIdentifiers: false,
        operatorsAliases: false,
        logging: true
      },
    )

    await this.defineModel()
  }

  async isConnected() {
    try {
      await this._sequelize.authenticate()
      return true
    } catch (error) {
      this.logError(error)
      return false
    }
  }

  async create(entity, item) {
    try {

      if (this.model[entity])
        return this.model[entity].create(item)
      else
        return null
    } catch (error) {
      this.logError(error)
      return null
    }
  }

  async read(entity, item) {
    try {
      if (this.model[entity]) {
        return this.model[entity].read(item)
      }
      else
        return null
    } catch (error) {
      this.logError(error)
      return null
    }
  }

  async update(entity, id, item) {
    try {
      if (this.model[entity])
        return this.model[entity].update(id, item)
      else
        return null
    } catch (error) {
      this.logError(error)
      return null
    }
  }

  async delete(entity, id) {
    const query = id ? id : {}
    if (this.model[entity])
      return this.model[entity].delete(id)
    else
      return null
  }
}

module.exports = PostgreSQLStrategy