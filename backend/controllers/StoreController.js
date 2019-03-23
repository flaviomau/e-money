class StoreController {
    constructor(StoreModel) {
      this.model = StoreModel
    }
  
    handleNotFound(data) {
      if (!data) {
        const err = new Error('Not Found in database')
        err.status = 404
        throw err
      }
      return data
    }
  
    readAll(request, response, next) {
      this.model.find({})
        .then(this.handleNotFound)
        .then(function (data) {
          response.json(data)
        })
        .catch(next)
    }
  
    readById(request, response, next) {
      const query = { id_store: request.params._id || null }
      this.model.findOne(query)
        .then(this.handleNotFound)
        .then(function (data) {
          response.json(data)
        })
        .catch(next)
    }
  
    readByUserId(request, response, next) {
      const query = { 'id_user': request.params._id || null }
      this.model.find(query)
        .then(this.handleNotFound)
        .then(function (data) {
          response.json(data)
        })
        .catch(next)
    }
  
    create(request, response, next) {
      const {store} = request.body
      this.model.create(store)
        .then(data => {
          response.json(data)
        })
        .catch(next)
    }
  
    update(request, response, next) {
      const _id = request.params._id
      const { store } = request.body
      this.model.update(_id, store)
        .then(data => {
          response.json(data)
        })
        .catch(next)
    }
  
    remove(request, response, next) {
      const _id = request.params._id
      this.model.remove(_id)
        .then(function (data) {
          response.json(data)
        })
        .catch(next)
    }
  }
  
  module.exports = function (StoreModel) {
    return new StoreController(StoreModel)
  }