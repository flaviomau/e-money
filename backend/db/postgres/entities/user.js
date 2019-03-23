const Sequelize = require('sequelize')

class User {
    constructor(sequelize) {
        this.sequelize = sequelize
        this.model = this.defineModel()
        this.model.sync()
    }

    logError(error){
        console.log("USER::INTERNAL_ERROR: ", error)
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

    async create(item) {
        try {
            return this.model.create(item)
        } catch (error) {
            this.logError(error)
            return null
        }
    }

    async read(item) {
        try {
            return this.model.findAll({ where: item, raw: true });
        } catch (error) {
            this.logError(error)
            return null
        }
    }

    async update(id, item) {
        try {
            return this.model.update(item, { where: { id_address: id }, raw: true })
        } catch (error) {
            this.logError(error)
            return null
        }
    }

    async delete(id) {
        const query = id ? id : {}
        return this.model.destroy({ where: query })
    }
}
module.exports = User