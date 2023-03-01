const express = require('express');
const routes = express.Router();

routes.get('/malls', async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = routes;
