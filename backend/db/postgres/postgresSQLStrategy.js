const IDb = require('../base/interfaceDB')
const Sequelize = require('sequelize')
const User = require('./entities/user')
const Customer = require('./entities/customer')
const Store = require('./entities/store')

class PostgreSQLStrategy extends IDb {
  constructor() {
    super()
    this._sequelize = null
    this.model = {
      'user': null,
      'customer': null,
      'store': null,
      'wallet': null,
      'transaction': null
    }
  }

  logError(error){
    console.log("POSTGRESQL_STRATEGY::INTERNAL_ERROR: ", error)
  }

  notFound(entity){
    throw new Error('model not foud (' + entity + ')')
  }

  async defineModel() {
    this.model.user = new User(this._sequelize)
    this.model.customer = new Customer(this._sequelize, this.model.user)
    this.model.store = new Store(this._sequelize, this.model.user)
  }

  async connect() {
    this._sequelize = new Sequelize(
      'emoney',      //database
      'mmlserver',    // user
      'mml20022019',  //password
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
        return await this.model[entity].create(item)
      else
        this.notFound(entity)
    } catch (error) {
      this.logError(error)
      throw new Error(error)
    }
  }

  async read(entity, item) {
    try {
      if (this.model[entity])
        return await this.model[entity].read(item)  
      else
        this.notFound(entity)
    } catch (error) {
      this.logError(error)
      throw new Error(error)
    }
  }

  async update(entity, id, item) {
    try {
      if (this.model[entity])
        return await this.model[entity].update(id, item)    
      else
        this.notFound(entity)
    } catch (error) {
      this.logError(error)
      throw new Error(error)
    }
  }

  async delete(entity, id) {
    if (this.model[entity])
      return await this.model[entity].delete(id)
    else
      this.notFound(entity)
  }
}

module.exports = PostgreSQLStrategy