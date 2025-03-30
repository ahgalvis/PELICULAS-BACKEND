const express = require('express');
const router = express.Router();
const Media = require('../models/media');
const Genero = require('../models/genero');
const Director = require('../models/director');
const Productora = require('../models/productora');

router.post('/', async (req, res) => {
  try {
    // Validar que el género, director y productora estén activos
    const genero = await Genero.findById(req.body.genero);
    if (!genero || genero.estado !== 'Activo') {
      return res.status(400).json({ mensaje: 'Género no válido o inactivo' });
    }

    const director = await Director.findById(req.body.director);
    if (!director || director.estado !== 'Activo') {
      return res.status(400).json({ mensaje: 'Director no válido o inactivo' });
    }

    const productora = await Productora.findById(req.body.productora);
    if (!productora || productora.estado !== 'Activo') {
      return res.status(400).json({ mensaje: 'Productora no válida o inactiva' });
    }

    const media = new Media(req.body);
    await media.save();
    res.status(201).json(media);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const medias = await Media.find()
      .populate('genero')
      .populate('director')
      .populate('productora')
      .populate('tipo');
    res.json(medias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const media = await Media.findById(req.params.id)
      .populate('genero')
      .populate('director')
      .populate('productora')
      .populate('tipo');
    if (!media) return res.status(404).json({ mensaje: 'Media no encontrada' });
    res.json(media);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const media = await Media.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!media) return res.status(404).json({ mensaje: 'Media no encontrada' });
    res.json(media);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const media = await Media.findByIdAndDelete(req.params.id);
    if (!media) return res.status(404).json({ mensaje: 'Media no encontrada' });
    res.json({ mensaje: 'Media eliminada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;