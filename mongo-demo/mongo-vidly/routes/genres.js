const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {Genre, validate} = require('../models/genre');
/*
const genres = [
    { id: 1, name: 'Action' },  
    { id: 2, name: 'Horror' },  
    { id: 3, name: 'Romance' },  
  ];
*/


// =========== CREATE Genre ==========

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();
  res.send(genre);
});

// createGenre();


// =========== READ / GET Genre ==============

router.get('/', async (req, res) => {
  const genres = await Genre.find().sort({ name: 1 });
  res.send(genres);
});


// getGenres();

// =========== UPDATE Genre =============

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  
  const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
      new: true
  });

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
});

//updateGenre('5f4c6432df20452dac18f470');

// ============ DELETE Genre ===============

router.delete('/:id', async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
});

// ============= GET SINGLE Genre ==============
router.get('/:id', async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  
  res.send(genre);
});


module.exports = router;