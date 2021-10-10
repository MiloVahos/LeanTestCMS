const mongoose = require('mongoose')

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('Mongo DB conectada')
  } catch (e) {
    console.log('Error de conexión a la base de datos')
  }
}

module.exports = conectarDB