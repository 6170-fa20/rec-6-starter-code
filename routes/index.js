const express = require('express');

const Shorts = require('../models/Shorts');

const router = express.Router();

/**
 * Serves homepage.
 * @name GET/
 */
router.get('/', (req, res) => {
  res.render('index');
});

/**
 * Access short URL.
 * @name GET/:shortName
 */
router.get('/:shortName', (req, res, next) => {
  const short = Shorts.findOne(req.params.shortName);
  if (short === undefined) {
    res.status(404).json({
      error: `Short URL ${req.params.shortName} not found.`,
    }).end();
  } else if (short.url) {
    res.redirect(short.url);
  } else {
    next();
  }
});

module.exports = router;
