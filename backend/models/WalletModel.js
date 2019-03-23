'use strict'

class WalletDao {

  constructor(db) {
    this._db = db
    this.tableName = 'wallet'    
  }

  async create(item){
    return await this._db.create(this.tableName, item)
  }
  
  async find(item){
    return await this._db.read(this.tableName, item)
  }
  
  async findOne(item){
    const wallet = await this._db.read(this.tableName, item)
    if(wallet.length == 0)
      return null
    else{
      return wallet[0]
    }      
  }
  
  async update(id_wallet, item){
    return await this._db.update(this.tableName, id_wallet, item)
  }
  
  async remove(id_wallet){
    return await this._db.delete(this.tableName, id_wallet)
  }
}

module.exports = WalletDao