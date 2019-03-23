'use strict'

class CustomerDao {

  constructor(db) {
    this._db = db
    this.tableName = 'customer'    
  }

  async create(item){
    return await this._db.create(this.tableName, item)
  }
  
  async find(item){
    return await this._db.read(this.tableName, item)
  }
  
  async findOne(item){
    const customer = await this._db.read(this.tableName, item)
    if(customer.length == 0)
      return null
    else{
      return customer[0]
    }      
  }
  
  async update(id_customer, item){
    return await this._db.update(this.tableName, id_customer, item)
  }
  
  async remove(id_customer){
    return await this._db.delete(this.tableName, id_customer)
  }
}

module.exports = CustomerDao