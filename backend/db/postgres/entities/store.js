const Sequelize = require('sequelize')

class store {
  constructor(sequelize, user) {
    this.sequelize = sequelize
    this.user = user
    this.model = this.defineModel()
    this.model.belongsTo(this.user.model, { foreignKey: 'id_user' })
    this.model.sync()
  }

  logError(error){
    console.log("STORE_ENTITY::INTERNAL_ERROR: ", error)
  }

  defineModel() {
    return this.sequelize.define(
      'store',
      {
        id_store: {
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
        modelName: 'store',
        freezemodelName: false,
        timestamps: false,
      },
    )
  }

  async create(item) {
    try {
      const { user } = item
      user.type = this.user.TYPE.STORE
      return this.user.create(user)
        .then(u => {
          item['id_user'] = u.id_user
          return this.model.create(item)
        })
    } catch (error) {
      this.logError(error)
      return null
    }
  }

  async read(item) {
    try {
      return this.model.findAll({
        where: item,
        raw: false,
        include: [{ model: this.user.model, attributes: { exclude: ["password"] } }]
      })
    } catch (error) {
      this.logError(error)
      return null
    }
  }

  async update(id_store, item) {
    try {
      const { user } = item
      await this.user.update(user.id_user, user)
      return await this.model.update(item, { where: { id_store }, raw: true })
    } catch (error) {
      this.logError(error)
      return null
    }
  }

  async delete(id_store) {
    return await this.model.destroy({ where: {id_store} })
  }
}

module.exports = store