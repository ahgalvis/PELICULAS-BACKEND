const mongoose = require('mongoose');

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB conectado');
  } catch (error) {
    console.log('Error de conexión a MongoDB:', error);
    process.exit(1);
  }
};

module.exports = conectarDB;