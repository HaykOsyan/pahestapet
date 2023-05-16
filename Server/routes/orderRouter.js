const Router = require('express')
const router = new Router()
const OrderController = require('../controllers/orderController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/', checkRoleMiddleware('ADMIN'), OrderController.create)
router.get('/', OrderController.getAll)
router.get('/:id', OrderController.getOne)
router.put('/:id', checkRoleMiddleware('ADMIN'), OrderController.update)
router.delete('/:id', checkRoleMiddleware('ADMIN'), OrderController.delete)

module.exports = router
