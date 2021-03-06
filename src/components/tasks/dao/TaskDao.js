const Task = require('../models/TaskModel')

const saveTask = async (task) => {
  const taskModel = await Task.create(task)
  return await taskModel.get({ plain: true })
}

const getTaskById = async (id) => {
  const taskModel = await Task.findOne({ where: { id }})
  if (!taskModel) return null
  return await taskModel.get({ plain: true })
}

const getTasksByUserId = async (userId) => {
  const tasks = await Task.findAll({ where: { user_id: userId }, raw: true })
  return tasks
}

const updateTaskById = async (id, updateTaskData) => {
  const taskModel = await Task.findOne({ where: { id }})
  if (!taskModel) return null
  const updatedTask = await taskModel.update(updateTaskData)
  return await updatedTask.get({ plain: true })
}

const deleteTaskById = async (id) => {
  const taskModel = await Task.findOne({ where: { id }})
  if (!taskModel) return false
  await taskModel.destroy()
  return true
}

module.exports = { saveTask, getTaskById, updateTaskById, deleteTaskById, getTasksByUserId }