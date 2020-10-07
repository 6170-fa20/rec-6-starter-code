const express = require('express');

const Users = require('../models/Users');

const router = express.Router();

/**
 * Get all users
 * @name GET /api/users
 */
router.get('/', async (req, res) => {
  try {
    let users = await Users.findAll();
    res.status(200).json(users).end();
  } catch (error) {
    res.status(503).json({ error: "Could not fetch users" }).end();
  }
});

/**
 * Create new user
 * @name POST /api/users
 */
router.post('/', async (req, res) => {
  try {
    if (req.body.username) {
      let user = await Users.addOne(req.body.username);
      res.status(201).json({user, message: "Please sign in to continue."}).end();
    } else {
      res.status(400).json({ error: "Cannot have empty username" }).end();
    }
  } catch (error) {
    res.status(400).json({ error: "Username must be unique and non-empty" }).end();
  }
});

module.exports = router;
