const Sequelize = require('sequelize')
const bcrypt = require('bcrypt')

class User {
  constructor(sequelize) {
    this.TYPE = {
      ADMIN: 0,
      CUSTOMER: 1,
      STORE: 2
    }

    this.sequelize = sequelize
    this.model = this.defineModel()
    this.model.sync()
  }

  logError(error) {
    console.log("USER_ENTITY::INTERNAL_ERROR: ", error)
  }

  defineModel() {
    return this.sequelize.define(
      'user',
      {
        id_user: {
          type: Sequelize.INTEGER,
          required: true,
          primaryKey: true,
          autoIncrement: true,
        },
        type: {
          type: Sequelize.SMALLINT,
          required: true,
        },
        username: {
          type: Sequelize.STRING,
          required: true
        },
        password: {
          type: Sequelize.STRING,
          required: true,
        },
      },
      {
        modelName: 'user',
        freezemodelName: false,
        timestamps: false,
      },
    )
  }

  async getHash(password) {
    const salt = await bcrypt.genSalt(5)
    return await bcrypt.hash(password, salt)
  }

  async create(item) {
    item.password = await this.getHash(item.password)
    return this.model.create(item)
  }

  async read(item) {
    return this.model.findAll({ where: item, raw: true })
  }

  async update(id_user, item) {
    if (item.password) {
      item.password = await this.getHash(item.password)
    }
    return this.model.update(item, { where: { id_user }, raw: true })
  }

  async delete(id_user) {
    return this.model.destroy({ where: { id_user } })
  }
}
module.exports = User