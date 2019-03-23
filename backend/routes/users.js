const createRouter = (UserModel)=> {
    const   express         = require('express'),
            router          = express.Router(),
            UserController  = require('../controllers/UserController')(UserModel),
            middlewareAuth  = require('../controllers/middlewareAuth')

    router.get('/',         middlewareAuth, UserController.readAll.bind(UserController))
    router.get('/:_id',     middlewareAuth, UserController.readById.bind(UserController))
    router.post('/',        middlewareAuth, UserController.create.bind(UserController))
    router.post('/login',                   UserController.login.bind(UserController))
    router.put('/:_id',     middlewareAuth, UserController.update.bind(UserController))
    router.delete('/:_id',  middlewareAuth, UserController.remove.bind(UserController))

    return router
}

module.exports = createRouter