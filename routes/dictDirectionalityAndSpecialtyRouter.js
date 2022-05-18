const Router = require('express'); //получаю роутер из экспресса
const router = new Router() // создаю объект этого роутера, его же необхоимо экспортировать
const controller = require('../controllers/dictDirectionalityAndSpecialtyController');
const checkRole = require("../middleware/checkRoleMiddleware"); //импорт логики роутера (хранится в контроллерах)

router.post('/', checkRole('canInsert'), controller.create);
router.get('/', controller.getAll);
router.get('/directionality', controller.getAllDirectionality);
router.get('/specialty', controller.getAllSpecialty);
router.get('/:id', controller.getOne);
router.delete('/:id', checkRole('canDelete'), controller.delete);
router.put('/', checkRole('canUpdate'), controller.update);

module.exports = router; // экспорт роутера, используется в файле index