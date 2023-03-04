const express = require('express');
const ControllerUser = require('../controllers/userController');
const { authetication } = require('../middleware/auth');
const Controller = require('../controllers/commonController');
const ControllerMall = require('../controllers/mallController');
const ControllerSpot = require('../controllers/spotController');
const BookingController = require('../controllers/bookingController');
const routes = express.Router();

routes.post('/login', ControllerUser.login);
routes.post('/register', ControllerUser.register);
// get all mals
routes.get('/malls', ControllerMall.getAllMalls);
// get all user by mall id
routes.get('/spots/:MallId', ControllerSpot.getAllSpots);
// when user booking

routes.get('/checkOut/:ParkingTransactionId', BookingController.checkOut);
routes.use(authetication);
///routes untuk user membooking parkir berdasarkan id parking spot
routes.post('/checkIn/:ParkingTransactionId', BookingController.checkIn);
routes.post('/bookings/:ParkingId', BookingController.bookingSpot);
routes.get('/tickets', Controller.getAllTickets);
routes.get('/parkingSlot/:MallId', ControllerMall.getParkingSlots);

module.exports = routes;
