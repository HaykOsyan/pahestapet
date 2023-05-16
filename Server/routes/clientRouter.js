const Router = require('express')
const router = new Router()
const ClientController = require('../controllers/clientController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/',checkRoleMiddleware('ADMIN'), ClientController.create)
router.get('/', ClientController.getAll)
router.get('/:id', ClientController.getOne)

module.exports = router