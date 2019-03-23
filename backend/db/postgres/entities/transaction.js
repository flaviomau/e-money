const Sequelize = require('sequelize')

class transaction {
  constructor(sequelize, wallet, store) {
    this.STATUS = {
      PENDENT: 0,
      APROVED: 1,
      REJECTED: 2,
      CANCELED: 3,
    }

    this.sequelize = sequelize
    this.wallet = wallet
    this.store = store
    this.model = this.defineModel()
    this.model.sync()
  }

  logError(error) {
    console.log("TRANSACTION_ENTITY::INTERNAL_ERROR: ", error)
  }

  defineModel() {
    return this.sequelize.define(
      'transaction',
      {
        id_transaction: {
          type: Sequelize.INTEGER,
          required: true,
          primaryKey: true,
          autoIncrement: true,
        },
        id_wallet: {
          type: Sequelize.INTEGER,
          required: true,
        },
        id_store: {
          type: Sequelize.INTEGER,
          required: true,
        },
        value: {
          type: Sequelize.INTEGER,
          required: true,
        },
        status: {
          type: Sequelize.SMALLINT,
          required: true,
        },
      },
      {
        modelName: 'transaction',
        freezemodelName: false,
        timestamps: false,
      },
    )
  }

  async create(item) {
    item['status'] = this.STATUS.PENDENT
    const _wallet = await this.wallet.read({ id_wallet: item.id_wallet })
    const _store = await this.store.read({ id_store: item.id_store })

    if (_wallet.length !== 1){
      throw new Error('wallet not found.')
    }else if (_store.length !== 1){
      throw new Error('store not found.')
    }else if (_wallet[0].balance < item.value){
      throw new Error('wallet without enough funds.')
    }else {
      await this.wallet.update(item.id_wallet, { balance: _wallet[0].balance - item.value })
      return await this.model.create(item)
    }
  }

  async read(item) {
    return this.model.findAll({
      where: item,
      raw: false
    })
  }

  async update(id_transaction, item) {
    return await this.model.update(item, { where: { id_transaction }, raw: true })
  }

  async delete(id_transaction) {
    return await this.model.destroy({ where: { id_transaction } })
  }
}

module.exports = transaction