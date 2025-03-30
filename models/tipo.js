const mongoose = require('mongoose');

const esquemaTipo = new mongoose.Schema({
  nombre: { type: String, required: true },
  fechaCreacion: { type: Date, default: Date.now },
  fechaActualizacion: { type: Date, default: Date.now },
  descripcion: { type: String },
});

module.exports = mongoose.model('Tipo', esquemaTipo);