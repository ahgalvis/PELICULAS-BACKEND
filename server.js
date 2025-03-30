const express = require('express');
const conectarDB = require('./config/db');
require('dotenv').config();

const app = express();

conectarDB();

app.use(express.json());

// Cambia 'rutas' por 'Routes'
app.use('/api/v1/generos', require('./routes/genero'));
app.use('/api/v1/directores', require('./routes/director'));
app.use('/api/v1/productoras', require('./routes/productora'));
app.use('/api/v1/tipos', require('./routes/tipo'));
app.use('/api/v1/medias', require('./routes/media'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));