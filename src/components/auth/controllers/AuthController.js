const { authUserByEmailAndPasssword } = require('../services/AuthService')

const authUser = async (req, res) => {
  const userData = req.body
  const response = await authUserByEmailAndPasssword(userData)
  res.status(200).json(response)
}

module.exports = { authUser }

