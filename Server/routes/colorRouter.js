const Router = require('express')
const router = new Router()
const ColorController = require('../controllers/colorController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/', checkRoleMiddleware('ADMIN'), ColorController.create)
router.get('/', ColorController.getAll)
router.get('/:id', ColorController.getOne)
router.put('/:id', checkRoleMiddleware('ADMIN'), ColorController.update)
router.delete('/:id', checkRoleMiddleware('ADMIN'), ColorController.delete)

module.exports = router
