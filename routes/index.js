const express = require("express");
const ControllerUser = require("../controllers/userController");
const { authetication } = require('../middleware/auth');
const Controller = require('../controllers/commonController');
const ControllerMall = require('../controllers/mallController');
const ControllerSpot = require('../controllers/spotController');
const BookingController = require("../controllers/bookingController");
const cron = require('node-cron');

routes = express.Router()



routes.post("/login", ControllerUser.login);
routes.post("/register", ControllerUser.register);
routes.get("/malls", ControllerMall.getAllMalls);
routes.get("/spots/:MallId", ControllerSpot.getAllSpots);
routes.use(authetication)
routes.post('/cars', ControllerUser.addCar) /// add first car, so it gonna be default
routes.post('/secondCar', ControllerUser.addSecondCar) /// add second car
routes.get('/cars', ControllerUser.getCars) //untuk fetch car berdasarkan user id
routes.post('/bookings/:ParkingId', BookingController.bookingSpot);
routes.post('/checkIn/:ParkingTransactionId', BookingController.checkIn);
routes.get('/tickets', Controller.getAllTickets);
routes.get('/parkingSlot/:MallId', ControllerMall.getParkingSlots)
routes.get('/checkOut/:ParkingTransactionId', Controller.checkOut);

module.exports = routes;
