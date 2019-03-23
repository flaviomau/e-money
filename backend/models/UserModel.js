'use strict'

class UserDao {

  constructor(db) {
    this._db = db
    this.tableName = 'user'
  
    this.TYPE = {
      CUSTOMER: 1,
      STORE: 2
    }
  }

  async create(item){
    return this._db.create(this.tableName, item)
  }
  
  async find(item){
    return this._db.read(this.tableName, item)
  }
  
  async findOne(item){
    const user = await this._db.read(this.tableName, item)
    if(user === null || user.length === 0)
      return null
    else{
      return user[0]
    }      
  }
  
  async update(id_user, item){
    return this._db.update(this.tableName, {id_user}, item)
  }
  
  async remove(id_user){
    return this._db.delete(this.tableName, {id_user})
  }
}

module.exports = UserDao