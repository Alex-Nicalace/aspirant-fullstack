const Router = require('express'); //получаю роутер из экспресса
const router = new Router() // создаю объект этого роутера, его же необхоимо экспортировать
const controller = require('../controllers/dictSubjectController');
const checkRole = require("../middleware/checkRoleMiddleware");

router.post('/', checkRole('canInsert'), controller.create);
router.get('/', controller.getAll);
router.get('/:id', controller.getOne);
router.delete('/:id', checkRole('canDelete'), controller.delete);
router.put('/', checkRole('canUpdate'), controller.update);

module.exports = router; // экспорт роутера, используется в файле index