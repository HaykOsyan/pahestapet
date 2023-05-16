const Router = require('express')
const router = new Router()
const OrderProductController = require('../controllers/orderProductController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

// router.post('/', checkRoleMiddleware('ADMIN'), OrderController.create)
router.get('/', OrderProductController.getAll)
// router.get('/:id', OrderProductController.getOne)
// router.put('/:id', checkRoleMiddleware('ADMIN'), OrderController.update)
// router.delete('/:id', checkRoleMiddleware('ADMIN'), OrderController.delete)

module.exports = router
