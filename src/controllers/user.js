const userModels = require('../models/user')
const { success, failed } = require('../helpers/response')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { privateKey } = require('../helpers/env');

const user = {
    login: async (req, res) => {
        try {
            const result = await userModels.findOne({ username: req.body.username })
            const match = await bcrypt.compare(req.body.password, result.password)
            if (match) {
                jwt.sign({ username: result.username, role: result.role }, privateKey, { expiresIn: 600 },
                    (err, token) => {
                        if (err) {
                            failed(res, 500, [], err.message)
                        } else {
                            try {
                                const id = result._id
                                const refreshToken = jwt.sign({ id }, 'REFRESH TOKEN 123')
                                result.token = token
                                result.refreshtoken = refreshToken
                                result.save(function (err) {
                                    if (err) return failed(res, 400, [], err.message)
                                    success(res, 200, { token, refreshToken }, 'login success')
                                })
                            } catch (error) {
                                failed(res, 500, [], 'internal server error')
                            }
                        }
                    }
                );
            } else {
                failed(res, 400, [], 'invalid password')
            }

        } catch (error) {
            failed(res, 404, [], 'username has not been registered')
        }
    },
    register: async (req, res) => {
        try {
            const salt = await bcrypt.genSaltSync(10)
            const hash = await bcrypt.hashSync(req.body.password, salt)
            if (req.body.role === 'admin' || req.body.role === 'user') {
                const userModel = new userModels({
                    username: req.body.username,
                    password: hash,
                    role: req.body.role
                })
                userModel.save(function (err) {
                    if (err) return failed(res, 400, [], 'username already exists')
                    success(res, 201, 'register success')
                })
            } else {
                failed(res, 400, [], 'role must be admin or user')
            }
        } catch (error) {
            failed(res, 400, [], error.message)
        }
    },
    refreshToken: async (req, res) => {
        try {
            const result = await userModels.findOne({ refreshtoken: req.body.refreshtoken })
            const newToken = jwt.sign({ username: result.username, role: result.role }, privateKey, { expiresIn: 600 })
            result.token = newToken
            const { token, refreshtoken } = result
            result.save(function (err) {
                if (err) return failed(res, 400, [], err.message)
                success(res, 200, { token, refreshtoken }, 'refresh token success')
            })
        } catch (error) {
            failed(res, 400, [], 'internal server error')
        }
    }
}

module.exports = user