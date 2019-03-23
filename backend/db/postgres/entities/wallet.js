const Sequelize = require('sequelize')

class wallet {
  constructor(sequelize) {
    this.sequelize = sequelize
    this.model = this.defineModel()
    this.model.sync()
  }

  logError(error) {
    console.log("WALLET_ENTITY::INTERNAL_ERROR: ", error)
  }

  defineModel() {
    return this.sequelize.define(
      'wallet',
      {
        id_wallet: {
          type: Sequelize.INTEGER,
          required: true,
          primaryKey: true,
          autoIncrement: true,
        },
        balance: {
          type: Sequelize.INTEGER,
          required: true,
        },
        description: {
          type: Sequelize.STRING,
          required: true,
        },
      },
      {
        modelName: 'wallet',
        freezemodelName: false,
        timestamps: false,
      },
    )
  }

  async create(item) {

    item['balance'] = 0
    return await this.model.create(item)
  }

  async read(item) {
    return this.model.findAll({
      where: item,
      raw: false
    })
  }

  async update(id_wallet, item) {
    return await this.model.update(item, { where: { id_wallet }, raw: true })
  }

  async delete(id_wallet) {
    return await this.model.destroy({ where: { id_wallet } })
  }
}

module.exports = wallet