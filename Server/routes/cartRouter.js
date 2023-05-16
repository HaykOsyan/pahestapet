const Router = require('express')
const router = new Router()
const CartController = require('../controllers/cartController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/',checkRoleMiddleware('ADMIN'), CartController.create)
router.get('/', CartController.getAll)
router.get('/:id', CartController.getOne)
router.put('/:id', checkRoleMiddleware('ADMIN'), CartController.update)
router.delete('/:id', checkRoleMiddleware('ADMIN'), CartController.delete)

module.exports = router