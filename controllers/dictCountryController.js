const {tblDictCountry} = require('../models/models');
const ApiError = require('../error/ApiError');
const Crud = require('./Crud');

// можно обойтись без класса создавая просто ф-ции, но
// классы группируют
class dictCountryController {
    async create(req, res, next) {
        await Crud.create(req, res, next, tblDictCountry);
    }

    async update(req, res, next) {
        await Crud.update(req, res, next, tblDictCountry);
    }

    async getOne(req, res, next) {
        await Crud.getOne(req, res, next, tblDictCountry);
    }

    async getAll(req, res, next) {
        await Crud.getAll(req, res, next, tblDictCountry, [['country', 'ASC']]);
    }

    async delete(req, res, next) {
        await Crud.delete(req, res, next, tblDictCountry);
    }
}

// на выходе новый объект, созданный из этого класса
module.exports = new dictCountryController()