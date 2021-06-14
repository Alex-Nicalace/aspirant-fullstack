const {tblFaceContacts, tblDictContactType} = require('../models/models');
const ApiError = require('../error/ApiError');
const {Sequelize} = require("sequelize");
const Crud = require('./Crud');

// можно обойтись без класса создавая просто ф-ции, но
// классы группируют
class faceContactsController {
    async create(req, res, next) {
        await Crud.create(req, res, next, tblFaceContacts);
    }

    async update(req, res, next) {
        await Crud.update(req, res, next, tblFaceContacts)
    }

    async getOne(req, res, next) {
        await Crud.getOne(req, res, next, tblFaceContacts)

    }

    async getAllOneFace(req, res, next) { // все записи для указанного лица
        const {faceId} = req.params;
        try {
            const rec = await tblFaceContacts.findAll({
                where: {
                    tblFaceId: faceId
                },
                attributes: [
                    'id', 'contact', 'createdAt', 'updatedAt',
                    [Sequelize.col('tblDictContactType.contactType'), 'contactType'], // указание поля из связной таблицы
                ],
                include: [ // это типа соединение JOIN как в SQL
                    {
                        model: tblDictContactType,
                        attributes: [], // указано какие поля необходимы. Если массив пустой то никакие поля не выводятся
                    },
                ],
                //order: [['dateOn', 'ASC']],
            });
            return res.json(rec);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }

    }

    async getAll(req, res, next) { // по идее незачем выводить все таблюцу но по аналогии со правочником пускай
        await Crud.getAll(req, res, next, tblFaceContacts)
    }

    async delete(req, res, next) {
        await Crud.delete(req, res, next, tblFaceContacts)
    }
}

// на выходе новый объект, созданный из этого класса
module.exports = new faceContactsController()