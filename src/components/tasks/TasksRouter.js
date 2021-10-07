const { Router } = require('express')
const { postTask, getTaskById, putTaskById, deleteTaskById } = require('../tasks/controllers/TaskController')
const { validateSchemaBody, validateSchemaParams } = require('../../utils/Validators')
const { catchErrors } = require('../../utils/ErrorHandler')
const createTaskSchema = require('./schemas/createTaskSchema')
const idSchema = require('./schemas/idSchema')
const updateTaskSchema = require('./schemas/updateTaskSchema')

const router = Router()

router.post(
  '/',
  validateSchemaBody(createTaskSchema),
  catchErrors(postTask)
)

router.get(
  '/:id',
  validateSchemaParams(idSchema),
  catchErrors(getTaskById)
)

router.put(
  '/:id',
  validateSchemaBody(updateTaskSchema),
  validateSchemaParams(idSchema),
  catchErrors(putTaskById)
)

router.delete(
  '/:id',
  validateSchemaParams(idSchema),
  catchErrors(deleteTaskById)
)

module.exports = router