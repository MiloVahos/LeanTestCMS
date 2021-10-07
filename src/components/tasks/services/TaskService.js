const { saveTask, getTaskById, updateTaskById, deleteTaskById } = require('../dao/TaskDao')
const boom = require('@hapi/boom')

const createTask = async (task) => {
  const newTask = await saveTask(task)
  return newTask
}

const getTask = async (id) => {
  const task = await getTaskById(id)
  if (!task) throw boom.notFound(`Task with id ${id} not found`)
  return task
}

const updateTask = async (id, updateTaskData) => {
  const updatedTask = await updateTaskById(id, updateTaskData)
  if (!updatedTask) throw boom.notFound(`Task with id ${id} not found`)
  return updatedTask
}

const deleteTask = async (id) => {
  const deletedTask = await deleteTaskById(id)
  if (!deletedTask) throw boom.notFound(`Task with id ${id} not found`)
  return { message: `Task with id ${id} was deleted`}
}

module.exports = { createTask, getTask, updateTask, deleteTask }