const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');
const uploadCloud = require('../config/cloudinary');

/* GET home page */
router.get('/', (req, res, next) => {
  Movie.find({})
    .then(movies => {
      res.render('index', { movies });
    })
    .catch(err => {
      console.error(err);
    });
});

router.get('/movie/add', (req, res, next) => {
  res.render('movie-add');
});

router.post('/movie/add', uploadCloud.single('photo'), (req, res, next) => {
  const { title, description } = req.body;
  console.log(req.file);
  const imgName = req.file.originalname;
  const imgPath = req.file.url;

  Movie.create({ title, description, imgName, imgPath })
    .then(() => {
      res.redirect('/');
    })
    .catch(err => {
      console.error(err);
    });
});

module.exports = router;
