const {tblFaceExaminations, tblDictSubject } = require('../models/models');
const ApiError = require('../error/ApiError');
const {Sequelize} = require("sequelize");
const Crud = require('./Crud');

// можно обойтись без класса создавая просто ф-ции, но
// классы группируют
class FaceExaminationsController {
    async create(req, res, next) {
        await Crud.create(req, res, next, tblFaceExaminations);
    }

    async update(req, res, next) {
        await Crud.update(req, res, next, tblFaceExaminations)
    }

    async getOne(req, res, next) {
        await Crud.getOne(req, res, next, tblFaceExaminations)

    }

    async getAllOneFace(req, res, next) { // все записи для указанного лица
        const {faceId} = req.params;
        try {
            const rec = await tblFaceExaminations.findAll({
                where: {
                    tblFaceId: faceId
                },
                include: [ // это типа соединение JOIN как в SQL
                    {
                        model: tblDictSubject,
                        //attributes: [], // указано какие поля необходимы. Если массив пустой то никакие поля не выводятся
                    },
                ],
                order: [['createdAt', 'DESC']],
            });
            return res.json(rec);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }

    }

    async getAll(req, res, next) { // по идее незачем выводить все таблюцу но по аналогии со правочником пускай
        await Crud.getAll(req, res, next, tblFaceExaminations, [['semesterNum', 'ASC']])
    }

    async delete(req, res, next) {
        await Crud.delete(req, res, next, tblFaceExaminations)
    }
}

// на выходе новый объект, созданный из этого класса
module.exports = new FaceExaminationsController()