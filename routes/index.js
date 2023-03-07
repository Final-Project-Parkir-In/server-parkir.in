///dari cakra
// accept all incoming
///backend final
const express = require("express");
const ControllerUser = require("../controllers/userController");
const Controller = require("../controllers/commonController");
const ControllerMall = require("../controllers/mallController");
const ControllerSpot = require("../controllers/spotController");
const BookingController = require("../controllers/bookingController");
const { authetication } = require("../middleware/auth");
routes = express.Router();
///dari cakra


routes.use(authetication);
routes.get("/malls", ControllerMall.getAllMalls);
routes.get("/malls/:id", ControllerMall.getMallById);
routes.get("/checkOut/:ParkingTransactionId", BookingController.checkOut);
routes.get("/getAllTickets", Controller.getAllTickets);
routes.post("/addSlot", ControllerSpot.addSlot);
routes.get("/spots/:MallId", ControllerSpot.getAllSpots);

///routes untuk user membooking parkir berdasarkan id parking spot
routes.post("/bookings/:ParkingId", BookingController.bookingSpot);
routes.post("/checkIn/:ParkingTransactionId", BookingController.checkIn);
routes.get("/tickets", Controller.getAllTickets); /// untuk mendapatkan semua ticket berdasarkan id
routes.get("/tickets/:id", Controller.getTicket); ///untuk mendapatkan detail ticket datanya => ticket, user, dan mobil dengan status default
routes.get("/parkingSlot/:MallId", ControllerMall.getParkingSlots);
routes.get("/checkOut/:ParkingTransactionId", Controller.checkOut);

routes.patch('/changeDefaultCar/:carId', ControllerUser.changeDefaultCar) ///mengirim car id yang mau diganti statusnya
routes.post('addCar/:UserId', ControllerUser.addCar) // for adding first car when register
routes.post('addSecondCar', ControllerUser.addSecondCar)// for adding second car after register done

///geolibfunc
routes.post('/nearestMalls', ControllerMall.getClosestMalls);


module.exports = routes;
