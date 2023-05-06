const express = require('express');
const userController = require('../controllers/userController')
const exerciseController = require('../controllers/exerciseController')
const logController = require('../controllers/logController')

const router = express.Router()

router.get('/users', 
    userController.userGet)

router.post('/users', 
    userController.userPost
)

router.post('/users/:_id/exercises', 
    exerciseController.postExercise
)

// no need to define queries here
router.get('/users/:_id/logs',
    logController.getLog
)


module.exports = router