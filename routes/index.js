const express = require('express');
const ControllerUser = require('../controllers/userController');
const Controller = require('../controllers/commonController');
const ControllerMall = require('../controllers/mallController');
const ControllerSpot = require('../controllers/spotController');
const BookingController = require('../controllers/bookingController');
const cron = require('node-cron');

routes = express.Router();

const { authetication } = require('../middleware/auth'); // ini gw tambah pak supaya bisa bookingspotnya

routes.post('/login', ControllerUser.login);
routes.post('/register', ControllerUser.register);
// when user booking
routes.use(authetication);
// get all mals
routes.get('/malls', ControllerMall.getAllMalls);
routes.get('/malls/:id', ControllerMall.getMallById);
routes.get('/checkOut/:ParkingTransactionId', BookingController.checkOut);
// get all user by mall id
routes.get('/getAllTickets', Controller.getAllTickets);
// routes.post('/bookings/:ParkingId', authetication, Controller.bookingSpot);
routes.get('/spots/:MallId', ControllerSpot.getAllSpots);
///routes untuk user membooking parkir berdasarkan id parking spot
routes.post('/bookings/:ParkingId', BookingController.bookingSpot);
routes.post('/checkIn/:ParkingTransactionId', BookingController.checkIn);
routes.get('/tickets', Controller.getAllTickets);
routes.get('/parkingSlot/:MallId', ControllerMall.getParkingSlots);
routes.get('/tickets/:ParkingTransactionId', Controller.getTicket); ///untuk mendapatkan detail ticket datanya => ticket, user, dan mobil dengan status default

module.exports = routes;
