'use strict'

class TransactionDao {

  constructor(db) {
    this._db = db
    this.tableName = 'transaction'
  }

  async create(item) {
    return await this._db.create(this.tableName, item)    
  }

  async find(item) {
    return await this._db.read(this.tableName, item)
  }

  async findOne(item) {
    const transaction = await this._db.read(this.tableName, item)
    if (transaction.length == 0)
      return null
    else {
      return transaction[0]
    }
  }

  async update(id_transaction, item) {
    return await this._db.update(this.tableName, id_transaction, item)    
  }

  async remove(id_transaction) {
    return await this._db.delete(this.tableName, id_transaction)
  }
}

module.exports = TransactionDao