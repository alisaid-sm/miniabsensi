const jwt = require('jsonwebtoken')
const { privateKey } = require('../helpers/env')
const { failed } = require('./response')

const auth = {
    authentication: (req, res, next ) => {
        const token = req.headers.token
        if (token === undefined || token === '') {
            failed(res, 400, [], 'token is required')
        } else {
            next()
        }
    },
    authorization: (req, res, next) => {
        const token = req.headers.token
        jwt.verify(token, privateKey, (err, decoded) => {
            if (err && err.name === 'TokenExpiredError') {
                failed(res, 401, [], 'token expired')
            } else if (err) {
                console.log(err);
                failed(res, 401, [], 'invalid token')
            } else {
                next()
            }
        })
    },
    roleVerification: (req, res, next) => {
        const token = req.headers.token
        const data = jwt.decode(token)
        if (data.role !== 'admin') {
            failed(res, 401, [], 'only for admin')
        } else {
            next()
        }
    }
}

module.exports = auth