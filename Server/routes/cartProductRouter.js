const Router = require('express')
const router = new Router()
const CartProductController = require('../controllers/cartProductController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/', CartProductController.create)
router.get('/', CartProductController.getAll)
router.get('/card/:cart_id', CartProductController.getByCartId) //HAYK UPGRADe
// router.get('/:id', CartProductController.getOne)
// router.put('/:id', checkRoleMiddleware('ADMIN'), CartProductController.update)
// router.delete('/:id', checkRoleMiddleware('ADMIN'), CartProductController.delete)

module.exports = router