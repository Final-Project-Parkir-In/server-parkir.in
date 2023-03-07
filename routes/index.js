const express = require('express');
const ControllerUser = require('../controllers/userController');
const Controller = require('../controllers/commonController');
const ControllerMall = require('../controllers/mallController');
const ControllerSpot = require('../controllers/spotController');
const BookingController = require('../controllers/bookingController');
const cron = require('node-cron');
const { authetication } = require('../middleware/auth');
const routes = express.Router()

routes.post('/login', ControllerUser.login);
routes.post('/register', ControllerUser.register);

routes.use(authetication)
routes.get('/malls', ControllerMall.getAllMalls);
routes.get('/malls/:id', ControllerMall.getMallById);
routes.get('/checkOut/:ParkingTransactionId', BookingController.checkOut);

routes.get('/getAllTickets', Controller.getAllTickets);
routes.post('/addSlot', ControllerSpot.addSlot);
routes.get('/spots/:MallId', ControllerSpot.getAllSpots);

routes.post('/bookings/:ParkingId', BookingController.bookingSpot);
routes.post('/checkIn/:ParkingTransactionId', BookingController.checkIn);
routes.get('/tickets', Controller.getAllTickets);
routes.get('/tickets/:id', Controller.getTicket) 
routes.get('/parkingSlot/:MallId', ControllerMall.getParkingSlots)
routes.get('/checkOut/:ParkingTransactionId', Controller.checkOut);

///geolibfunc
routes.get('/nearestMalls', ControllerMall.getClosestMalls)



module.exports = routes;
