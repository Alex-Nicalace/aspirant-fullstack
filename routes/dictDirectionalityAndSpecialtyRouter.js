const Router = require('express'); //получаю роутер из экспресса
const router = new Router() // создаю объект этого роутера, его же необхоимо экспортировать
const controller = require('../controllers/dictDirectionalityAndSpecialtyController'); //импорт логики роутера (хранится в контроллерах)

router.post('/', controller.create);
router.get('/', controller.getAll);
router.get('/directionality', controller.getAllDirectionality);
router.get('/specialty', controller.getAllSpecialty);
router.get('/:id', controller.getOne);
router.delete('/:id', controller.delete);
router.put('/', controller.update);

module.exports = router; // экспорт роутера, используется в файле index