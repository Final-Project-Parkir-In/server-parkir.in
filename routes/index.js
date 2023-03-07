const express = require('express');
const ControllerUser = require('../controllers/userController');

const { authetication } = require('../middleware/auth');
const Controller = require('../controllers/commonController');
const ControllerMall = require('../controllers/mallController');
const ControllerSpot = require('../controllers/spotController');
const BookingController = require('../controllers/bookingController');
const cron = require('node-cron');

routes = express.Router()

routes.post('/login', ControllerUser.login);
routes.post('/register', ControllerUser.register);
routes.use(authetication);
// get all mals
routes.get('/malls', ControllerMall.getAllMalls);
routes.get('/malls/:id', ControllerMall.getMallById);
// get all user by mall id
routes.get('/getAllTickets', Controller.getAllTickets);
routes.post('/getAllTickets', Controller.getAllTickets); //tambahan
routes.post('/addSlot', ControllerSpot.addSlot); //tambahan
routes.post('/checkIn/:id', Controller.checkIn); // tambahan
routes.get('/spots/:MallId', ControllerSpot.getAllSpots);
// when user booking

///routes untuk user membooking parkir berdasarkan id parking spot
routes.post('/bookings/:ParkingId', BookingController.bookingSpot);
routes.post('/checkIn/:ParkingTransactionId', BookingController.checkIn);
routes.get('/tickets', Controller.getAllTickets); /// untuk mendapatkan semua ticket berdasarkan id
routes.get('/tickets/:id', Controller.getTicket) ///untuk mendapatkan detail ticket datanya => ticket, user, dan mobil dengan status default
routes.get('/parkingSlot/:MallId', ControllerMall.getParkingSlots)
routes.get('/checkOut/:ParkingTransactionId', Controller.checkOut);

///geolibfunc
routes.get('/nearestMalls', ControllerMall.getClosestMalls)


///mall mongodb
routes.post('/addMalls', ControllerMall.addMalls)
routes.get('/mallsByDistance', ControllerMall.getNearestMalls)

module.exports = routes;
