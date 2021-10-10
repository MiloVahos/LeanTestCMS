const { createTask, getTask, updateTask, deleteTask, getTasksList } = require('../services/TaskService')

const postTask = async (req, res) => {
  const user = res.locals
  const task = req.body
  const response = await createTask(user, task)
  res.status(200).json(response)
}

const getTaskById = async (req, res) => {
  const user = res.locals
  const id = Number(req.params.id)
  const response = await getTask(id, user)
  res.status(200).json(response)
}

const getTasksListByUserId = async (req, res) => {
  const user = res.locals
  const userId = Number(req.params.userId)
  const response = await getTasksList(userId, user)
  res.status(200).json(response)
}

const putTaskById = async (req, res) => {
  const id = req.params.id
  const updateTaskData = req.body
  const response = await updateTask(id, updateTaskData)
  res.status(200).json(response)
}

const deleteTaskById = async (req, res) => {
  const id = req.params.id
  const response = await deleteTask(id)
  res.status(200).json(response)
}

module.exports = { postTask, getTaskById, putTaskById, deleteTaskById, getTasksListByUserId }