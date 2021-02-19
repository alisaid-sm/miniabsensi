const studentModels = require('../models/student')
const { success, failed } = require('../helpers/response')

const student = {
    getAll: (req, res) => {
        try {
            studentModels.find()
                .then((result) => {
                    success(res, 200, result, 'ok')
                })
                .catch((err) => {
                    failed(res, 500, [], err.message)
                })
        } catch (error) {
            failed(res, 500, [], 'internal server error')
        }
    },
    getByAbsent: (req, res) => {
        try {
            studentModels.findOne({ absent: req.params.absent })
                .then((result) => {
                    success(res, 200, result, 'ok')
                })
                .catch((err) => {
                    failed(res, 404, [], err.message)
                })
        } catch (error) {
            failed(res, 404, [], 'internal server error')
        }
    },
    create: (req, res) => {
        try {
            const studentModel = new studentModels({
                name: req.body.name,
                absent: req.body.absent
            })
            studentModel.save()
                .then((result) => {
                    success(res, 201, result, 'ok')
                })
                .catch((err) => {
                    failed(res, 400, [], 'absent already exists')
                })
        } catch (error) {
            failed(res, 400, [], 'internal server error')
        }
    },
    update: async (req, res) => {
        try {
            const studentModel = await studentModels.findOne({ absent: req.params.absent })
            studentModel.updatedAt = Date.now()
            studentModel.name = !req.body.name ? studentModel.name : req.body.name
            studentModel.absent = !req.body.absent ? studentModel.absent : req.body.absent
            studentModel.save()
                .then((result) => {
                    success(res, 200, result, 'ok')
                })
                .catch((err) => {
                    failed(res, 400, [], err.message)
                })
        } catch (error) {
            failed(res, 400, [], error.message)
        }
    },
    delete: async (req, res) => {
        try {
            const studentModel = await studentModels.findOne({ absent: req.params.absent })
            studentModel.remove()
                .then((result) => {
                    success(res, 200, result, 'deleted')
                })
                .catch((err) => {
                    failed(res, 400, [], err.message)
                })
        } catch (error) {
            failed(res, 400, [], error.message)
        }
    }
}

module.exports = student