'use strict'

class StoreDao {

  constructor(db) {
    this._db = db
    this.tableName = 'store'
  }

  async create(item){
    return await this._db.create(this.tableName, item)
  }
  
  async find(item){
    return await this._db.read(this.tableName, item)
  }
  
  async findOne(item){
    const store = await this._db.read(this.tableName, item)
    if(store.length == 0)
      return null
    else{
      return store[0]
    }      
  }
  
  async update(id_store, item){
    return await this._db.update(this.tableName, id_store, item)
  }
  
  async remove(id_store){
    return await this._db.delete(this.tableName, id_store)
  }
}

module.exports = StoreDao