const jwt     = require('jwt-simple'),
    config  = require('config'),
    moment  = require('moment')

const middlewareAuth = function(request, reponse, next){
  const token = (request.body && request.body.access_token) || (request.query && request.query.access_token) || request.headers['x-access-token']
  if(!token){
    let err = new Error('Forbidden')
    err.status = 403
    return next(err)
  }

  try{
    const decoded = jwt.decode(token, config.get('jwtTokenSecret'))
    const isExpired = moment(decoded.expires).isBefore(new Date())

    if(!decoded.expires){
      let err = new Error('Unauthorized (token malformed)')
      err.status = 401
      return next(err)
    }else if(isExpired){
      let err = new Error('Unauthorized (token expired)')
      err.status = 401
      return next(err)
    }else{
      request.username = decoded.username
      request.type = decoded.type
      request._id = decoded._id
      next()
    }
  }catch(err){
    return next(err)
  }
}

module.exports = middlewareAuth