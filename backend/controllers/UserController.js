const jwt = require('jwt-simple'),
  moment = require('moment'),
  config = require('config'),
  bcrypt = require('bcrypt')

class UserController{
  constructor(UserModel){
    this.model = UserModel
  }

  handleNotFound(data) {
    if (data === null || data.length == 0) {
      let err = new Error('Not Found in database')
      err.status = 404
      throw err
    }
    return data
  }
  
  readAll(request, response, next) {
    this.model.find({})
      .then(function (data) {
        response.json(data)
      })
      .catch(next)
  }
  
  readById(request, response, next) {
    const query = { id_user: request.params._id }
    this.model.findOne(query)
      .then(this.handleNotFound)
      .then(function (data) {
        response.json(data)
      })
      .catch(next)
  }
  
  create(request, response, next) {
    const {user} = request.body
    this.model.create(user)
      .then(data => {
        response.json(data)
      }).catch(error => {
        next(error)
      })
  }
  
  update(request, response, next) {
    const _id = request.params._id
    const {user} = request.body
  
    this.model.update(_id, user)
      .then(function (data) {
        response.json(data)
      })
      .catch(error => {
        next(error)
      })
  }
  
  remove(request, response, next) {
    const _id = request.params._id
    this.model.remove(_id)
      .then(function (data) {
        response.json(data)
      })
      .catch(next)
  }
  
  login(request, response, next) {
    const username = request.body.username || ''
    const password = request.body.password || ''
    if (username == '' || password == '') {
      let err = new Error('Unauthorized (missing username or password)')
      err.status = 401
      return next(err)
    }
    const query = { username: username }
    this.model.findOne(query)
      .then(this.handleNotFound)
      .then(function (data) {
        bcrypt.compare(password, data.password, function (err, isMatch) {
          if (isMatch) {
            const expires = moment().add(7, 'days').valueOf()
            const token = jwt.encode({
              _id: data._id,
              username: username,
              type: data.type,
              expires: expires
            },
              config.get('jwtTokenSecret')
            )
            response.json({ token: token })
          } else {
            var err = new Error('Invalid Password')
            err.status = 401
            return next(err)
          }
        })
      })
      .catch(next)
  }
}

module.exports = function (UserModel) {
  return new UserController(UserModel)
}