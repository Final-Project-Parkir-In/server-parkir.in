const express = require("express");
const ControllerUser = require("../controllers/userController");
const { authetication } = require('../middleware/auth');
const Controller = require('../controllers/commonController');
const ControllerMall = require('../controllers/mallController');
const ControllerSpot = require('../controllers/spotController');
const BookingController = require("../controllers/bookingController");
routes = express.Router()


routes.post("/login", ControllerUser.login);
routes.post("/register", ControllerUser.register);
routes.get("/malls", ControllerMall.getAllMalls);
routes.get("/spots/:MallId", ControllerSpot.getAllSpots);
routes.use(authetication)
routes.post('/bookings/:ParkingId', BookingController.bookingSpot);
routes.post('/checkIn/:ParkingTransactionId', BookingController.checkIn);
routes.get('/tickets', Controller.getAllTickets);
routes.get('/parkingSlot/:MallId', ControllerMall.getParkingSlots)
routes.get('/checkOut/:ParkingTransactionId', Controller.checkOut);
routes.post('/checkIn/:ParkingTransactionId', Controller.checkIn);

module.exports = routes;
