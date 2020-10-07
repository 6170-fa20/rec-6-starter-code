const e = require('express');
const express = require('express');

const Users = require('../models/Users');

const router = express.Router();

/**
 * Create an authentication session for the user after authentication
 * @name POST /api/users/session
 */
router.post('/', async (req, res) => {
  // cannot sign in multiple times
  if (req.session.uid) {
    res.status(400).json({ error: "You are already signed in!" }).end();
    return;
  }
  // must specify username in body
  if (!(req.body.username)) {
    res.status(400).json({ error: "You must specify a username" }).end();
    return;
  }
  
  let user = await Users.findOne(req.body.username);
  
  // must find user in the DB
  if (!(user)) {
    res.status(404).json({ error: `Could not find user ${req.body.username}` }).end();
    return;
  }
  
  // authenticate and sign the user in
  req.session.uid = user.id;
  res.status(201).json(user).end();
});

/**
 * Sign the user out by wiping their authentication session
 * @name DELETE /api/users/session
 */
router.delete('/', (req, res) => {
  // must not be signed in already
  if (!(req.session.uid)) {
    res.status(400).json({ error: "You have to sign in first to sign out." }).end();
    return;
  }
  
  // sign out user
  req.session.uid = undefined;
  res.status(200).end();
});

module.exports = router;