const IDb = require('./interfaceDB')
class ContextStrategy extends IDb {
  constructor(database) {
    super()
    this._database = database
  }
  isConnected() {
    return this._database.isConnected()
  }
  connect() {
    return this._database.connect()
  }
  create(table, item) {
    return this._database.create(table, item)
  }
  read(table, item) {
    return this._database.read(table, item)
  }
  update(table, id, item) {
    return this._database.update(table, id, item)
  }
  delete(table, id) {
    return this._database.delete(table, id)
  }
}

module.exports = ContextStrategy