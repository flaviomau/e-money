class NotImplementedException extends Error {
    constructor() {
      super('Not Implemented Exception')
    }
  }
  //interface
  class IDb {
    create(table, item) {
      throw new NotImplementedException()
    }
    read(table, item) {
      throw new NotImplementedException()
    }
    update(table, id, item) {
      throw new NotImplementedException()
    }
    delete(table, id) {
      throw new NotImplementedException()
    }
    isConnected() {
      throw new NotImplementedException()
    }
  }
  
  module.exports = IDb