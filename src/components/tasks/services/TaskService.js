const { saveTask, getTaskById, updateTaskById, deleteTaskById, getTasksByUserId } = require('../dao/TaskDao')
const boom = require('@hapi/boom')
const { USER_ROLE, ADMIN_ROLE } = require('../../../utils/constants')
const { sendEmail } = require('../../../utils/mailer')
const mqttClient = require('../../../utils/notifications')

const createTask = async (user, task) => {
  if (task.user_id && user.role === USER_ROLE && task.user_id !== user.id) {
    throw boom.badRequest('Only Admin users can assign tasks to other users')
  }
  if (!task.user_id) {
    task.user_id = user.id
  }
  // Falta validar que el usuario con id exista
  await sendEmail('jpena@lean-tech.io', `Task - ${task.name} - created for you`)
  const newTask = await saveTask(task)
  mqttClient.publish('lean/test', `New task with id ${newTask.id} created`)
  return newTask
}

const getTask = async (id, user) => {
  const task = await getTaskById(id)
  if (!task || (user.role === USER_ROLE && user.id !== task.user_id)) throw boom.notFound(`Task with id ${id} not found`)
  mqttClient.publish('lean/test', `User ${user.id} get the task with id ${id}`)
  return task
}

const getTasksList = async (userId, user) => {
  if (user.role === USER_ROLE && userId !== user.id) throw boom.notFound(`User with id ${userId} does not have tasks`)
  const tasks = await getTasksByUserId(userId)
  return tasks
}

const updateTask = async (id, updateTaskData) => {
  const updatedTask = await updateTaskById(id, updateTaskData)
  if (!updatedTask) throw boom.notFound(`Task with id ${id} not found`)
  mqttClient.publish('lean/test', `Task with id ${id} was updated`)
  return updatedTask
}

const deleteTask = async (id) => {
  const deletedTask = await deleteTaskById(id)
  if (!deletedTask) throw boom.notFound(`Task with id ${id} not found`)
  mqttClient.publish('lean/test', `Task with id ${id} was deleted`)
  return { message: `Task with id ${id} was deleted`}
}

module.exports = { createTask, getTask, updateTask, deleteTask, getTasksList }