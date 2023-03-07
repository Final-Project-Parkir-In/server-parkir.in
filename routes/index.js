
const express = require('express');
const ControllerUser = require('../controllers/userController');
const Controller = require('../controllers/commonController');
const ControllerMall = require('../controllers/mallController');
const ControllerSpot = require('../controllers/spotController');
const BookingController = require('../controllers/bookingController');
const cron = require('node-cron');
const routes = express.Router();
const { authetication } = require('../middleware/auth');
routes.post('/login', ControllerUser.login);
routes.post('/register', ControllerUser.register);
// ini bikin auth khusus admin kalau sempat
routes.post('/checkIn/:ParkingTransactionId', BookingController.checkIn);

routes.use(authetication);
// get all mals
routes.get("/malls", ControllerMall.getAllMalls);
routes.get("/malls/:id", ControllerMall.getMallById);
routes.get("/checkOut/:ParkingTransactionId", BookingController.checkOut);
// get all user by mall id

routes.post('/addSlot', ControllerSpot.addSlot); //tambahan
routes.get('/spots/:MallId', ControllerSpot.getAllSpots);
// when user booking
routes.post('/bookings/:ParkingId', BookingController.bookingSpot);
routes.get('/tickets', Controller.getAllTickets); /// untuk mendapatkan semua ticket berdasarkan id
routes.get('/tickets/:id', Controller.getTicket); ///untuk mendapatkan detail ticket datanya => ticket, user, dan mobil dengan status default
routes.get('/parkingSlot/:MallId', ControllerMall.getParkingSlots);

///geolibfunc
routes.post('/nearestMalls', ControllerMall.getClosestMalls);


module.exports = routes;
