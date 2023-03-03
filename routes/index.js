const express = require('express');
const ControllerUser = require('../controllers/controllers');

const Controller = require('../controllers/commonController');
const ControllerMall = require('../controllers/mallController');
const ControllerSpot = require('../controllers/spotController');
const { authetication } = require('../middleware/auth');
const routes = express.Router();

routes.post('/login', ControllerUser.login);
// get all mals
routes.get('/malls', ControllerMall.getAllMalls);
// get all user by mall id
routes.get('/spots/:MallId', ControllerSpot.getAllSpots);
// when user booking
routes.use(authetication)
///routes untuk user membooking parkir berdasarkan id parking spot
routes.post('/bookings/:ParkingId', Controller.bookingSpot);
routes.post('/checkIn/:id', Controller.checkIn);
routes.get('/tickets', Controller.getAllTickets);




module.exports = routes;
