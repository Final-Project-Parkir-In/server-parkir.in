const express = require('express');
const Controller = require('../controllers/controllers');
const routes = express.Router();




routes.post('/login', Controller.login)



// routes.get('/malls', async (req, res) => {
//   try {
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = routes;
