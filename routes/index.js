const express = require("express");
const ControllerUser = require("../controllers/userController");

const { authetication } = require("../middleware/auth");
const Controller = require("../controllers/commonController");
const ControllerMall = require("../controllers/mallController");
// const ControllerSpot = require("../controllers/spotController");
const BookingController = require("../controllers/bookingController");
const cron = require("node-cron");
// const { route } = require("../app");

routes = express.Router();
routes.post("/login", ControllerUser.login);
routes.post("/register", ControllerUser.register);
// get all mals
routes.get("/malls", ControllerMall.getAllMalls);
routes.get("/malls/:id", ControllerMall.getMallById);
// get all user by mall id
// routes.get("/getAllTickets", Controller.getAllTickets);
// routes.post("/getAllTickets", Controller.getAllTickets); //tambahan
// routes.post("/addSlot", ControllerSpot.addSlot); //tambahan
// routes.post(
//   "/bookings/:ParkingId",
//   authetication,
//   BookingController.bookingSpot
// );
// routes.post("/checkIn/:id", Controller.checkIn); // tambahan
// routes.get("/spots/:MallId", ControllerSpot.getAllSpots);
// when user booking
//=============================================================
//=============================================================

routes.use(authetication);
///routes untuk user membooking parkir berdasarkan id parking spot
// routes.post("/addSecondCar/:UserId", ControllerUser.addSecondCar);
routes.post("/addCar/:UserId", ControllerUser.addCar);
routes.get("/getCars", ControllerUser.getCars);
routes.post("/bookings/:ParkingId", BookingController.bookingSpot);
routes.post("/checkIn/:ParkingTransactionId", BookingController.checkIn);
routes.get("/tickets", Controller.getAllTickets);
routes.get("/parkingSlot/:MallId", ControllerMall.getParkingSlots);
routes.get("/checkOut/:ParkingTransactionId", BookingController.checkOut);

module.exports = routes;
