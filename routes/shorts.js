const express = require('express');

const Shorts = require('../models/Shorts');

const router = express.Router();

/**
 * Create a short.
 * @name POST/api/shorts
 * @param {string} name - name of short (link will be /:short)
 * @param {string} url - link short points to
 * @return {Short} - the created short
 * @throws {401} - If an auth user tries to create a short
 * @throws {409} - If auth user tries to create a short that already exists
 * @throws {400} - if name is already taken
 */
router.post('/', async (req, res) => {
  if (req.session.uid === undefined) {
    res.status(401).json({
      error: "You must be signed in to create a short."
    }).end();
  } else {
    const short = await Shorts.findOne(req.body.name);
    if (req.body.name === '') {
      res.status(400).json({
        error: 'You must provide a name for a short!'
      }).end();
    } else if (short !== undefined) {
      res.status(409).json({
        error: `Short URL ${req.body.name} already exists.`,
      }).end();
    } else if (req.body.url === '') {
      res.status(400).json({
        error: "Must provide a URL for the short."
      }).end();
    } else {
      const short = await Shorts.addOne(req.body.name, req.body.url, req.session.uid); 
      res.status(201).json(short).end();
    }
  }
});

/**
 * List all shorts.
 * @name GET/api/shorts
 * @return {Short[]} - list of shorts
 */
router.get('/', async (req, res) => {
  res.status(200).json(await Shorts.findAll()).end();
});

/**
 * Update a short.
 * @name PUT/api/shorts/:name
 * :name is the name of the short
 * @param {string} url - the new URL to point to
 * @return {Short} - the updated short
 * @throws {401} - If an unauth user tries to update a short
 * @throws {403} - If auth user tries to update a short they didn't create
 * @throws {404} - if short does not exist
 */
router.put('/:name?', async (req, res) => {
  if (req.session.uid === undefined) {
    res.status(401).json({
      error: "You must be signed in to update a short."
    }).end();
  } else if (req.params.name === undefined) {
    res.status(400).json({
      error: "You must provide a name of the short you wish to update."
    }).end();
  } else {
    const short = await Shorts.findOne(req.params.name);
    if (short === undefined) {
      res.status(404).json({
        error: `Short URL ${req.params.name} does not exist.`,
      }).end();
    } else if (short.creator !== req.session.uid) {
      res.status(403).json({
        error: 'You cannot update a short you did not create!'
      }).end();
    } else if (req.body.url === '') {
      res.status(400).json({
        error: "You must enter a URL to update this short."
      }).end();
    } else {
      const updatedShort = await Shorts.updateOne(req.params.name, req.body.url);
      res.status(200).json(updatedShort).end();
    }
  }
});

/**
 * Delete a short.
 * @name DELETE/api/shorts/:name
 * :name is the name of the short
 * @return {Short} - the deleted short
 * @throws {401} - if unauth user tries to delete a short
 * @throws {404} - if short does not exist
 */
router.delete('/:name?', async (req, res) => {
  if (req.session.uid === undefined) {
    res.status(401).json({
      error: 'You must be signed in to delete a short!'
    }).end();
  } else if (req.params.name === undefined) {
    res.status(400).json({
      error: 'Must provide name of short you wish to delete.'
    }).end();
  } else if (await Shorts.findOne(req.params.name) === undefined) {
    res.status(404).json({
      error: `Short URL ${req.params.name} does not exist.`,
    }).end();
  } else {
    const short = await Shorts.findOne(req.params.name);
    if (short.creator !== req.session.uid) {
      res.status(403).json({
        error: "You cannot delete a short that you didn't create!"
      }).end();
    } else {
      const deletedShort = await Shorts.deleteOne(req.params.name);
      res.status(200).json(deletedShort).end();
    }
  }
});

module.exports = router;
