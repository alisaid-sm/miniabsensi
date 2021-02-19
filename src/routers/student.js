const express = require('express')
const studentController = require('../controllers/student')
const { authentication, authorization, roleVerification } = require('../helpers/auth')

const router = express.Router()

router.get('/', authentication, authorization, studentController.getAll)
router.get('/:absent', authentication, authorization, studentController.getByAbsent)
router.post('/', authentication, authorization, roleVerification, studentController.create)
router.patch('/:absent', authentication, authorization, roleVerification, studentController.update)
router.delete('/:absent', authentication, authorization, roleVerification, studentController.delete)

module.exports = router