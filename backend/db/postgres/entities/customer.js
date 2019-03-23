const Sequelize = require('sequelize')

class customer {
  constructor(sequelize, user) {
    this.sequelize = sequelize
    this.user = user
    this.model = this.defineModel()
    this.model.belongsTo(this.user.model, { foreignKey: 'id_user' })
    this.model.sync()
  }

  logError(error) {
    console.log("CUSTOMER_ENTITY::INTERNAL_ERROR: ", error)
  }

  defineModel() {
    return this.sequelize.define(
      'customer',
      {
        id_customer: {
          type: Sequelize.INTEGER,
          required: true,
          primaryKey: true,
          autoIncrement: true,
        },
        id_user: {
          type: Sequelize.INTEGER,
          required: true,
        },
        name: {
          type: Sequelize.STRING,
          required: true,
        },
      },
      {
        modelName: 'customer',
        freezemodelName: false,
        timestamps: false,
      },
    )
  }

  async create(item) {
    const { user } = item
    user.type = this.user.TYPE.CUSTOMER
    return this.user.create(user)
      .then(u => {
        item['id_user'] = u.id_user
        return this.model.create(item)
      })
  }

  async read(item) {
    return this.model.findAll({
      where: item,
      raw: false,
      include: [{ model: this.user.model, attributes: { exclude: ["password"] } }]
    })
  }

  async update(id_customer, item) {
    const { user } = item
    await this.user.update(user.id_user, user)
    return await this.model.update(item, { where: { id_customer }, raw: true })
  }

  async delete(id_customer) {
    return await this.model.destroy({ where: { id_customer } })
  }
}

module.exports = customer