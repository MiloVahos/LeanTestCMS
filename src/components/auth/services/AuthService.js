const axios = require('axios')
const boom = require('@hapi/boom')
const sign = require('jwt-encode')

const getAuth0Token = async () => {
  const data = {
    audience: process.env.AUTH0_AUDIENCE,
    grant_type: process.env.AUTH0_GRANT_TYPE,
    client_id: process.env.AUTH0_CLIENT_ID,
    client_secret: process.env.AUTH0_CLIENT_SECRET
  }
  try { 
    const response = await axios.post(process.env.AUTH0_TOKEN_URL, data)
    return response.data.access_token
  } catch (e) {
    throw boom.badImplementation('Something went wrong, please contact support')
  }
}

const authUserByEmailAndPasssword = async (userData) => {
  const { email, password } = userData
  const auth0Token = await getAuth0Token()
  const isUserValid = await validateUser(email, password, auth0Token)
  if (isUserValid.auth) {
    const user = isUserValid.user
    const accessToken = sign(user, process.env.JWT_SECRET);
    return { accessToken }
  } else {
    throw boom.unauthorized()
  }
 }

const validateUser = async (email, password, auth0Token) => {
  try {
    const response = await axios.post('http://localhost:3000/user/auth', { email, password }, {
      headers: {
        authorization: `Bearer ${auth0Token}`
      }
    }) 
    if (!response) return { auth: false }
    return response.data
  } catch (e) {
    return { auth: false }
  }
}

module.exports = { getAuth0Token, authUserByEmailAndPasssword }