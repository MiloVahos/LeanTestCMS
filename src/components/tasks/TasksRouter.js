const { Router } = require('express')
const { postTask, getTaskById, putTaskById, deleteTaskById, getTasksListByUserId } = require('../tasks/controllers/TaskController')
const { validateSchemaBody, validateSchemaParams } = require('../../utils/Validators')
const { catchErrors } = require('../../utils/ErrorHandler')
const createTaskSchema = require('./schemas/createTaskSchema')
const idSchema = require('./schemas/idSchema')
const userIdSchema = require('./schemas/userIdSchema')
const updateTaskSchema = require('./schemas/updateTaskSchema')
const { validateUserRole } = require('../../utils/Authorization')

const router = Router()

router.post(
  '/',
  validateUserRole(['ADMIN', 'USER']),
  validateSchemaBody(createTaskSchema),
  catchErrors(postTask)
)

router.get(
  '/:id',
  validateUserRole(['ADMIN', 'USER']),
  validateSchemaParams(idSchema),
  catchErrors(getTaskById)
)

router.get(
  '/list/:userId',
  validateUserRole(['ADMIN', 'USER']),
  validateSchemaParams(userIdSchema),
  catchErrors(getTasksListByUserId)
)

router.put(
  '/:id',
  validateUserRole(['ADMIN']),
  validateSchemaBody(updateTaskSchema),
  validateSchemaParams(idSchema),
  catchErrors(putTaskById)
)

router.delete(
  '/:id',
  validateUserRole(['ADMIN']),
  validateSchemaParams(idSchema),
  catchErrors(deleteTaskById)
)

module.exports = router