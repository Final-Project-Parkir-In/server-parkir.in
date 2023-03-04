const express = require("express");
const ControllerUser = require("../controllers/controllers");

const Controller = require("../controllers/commonController");
const ControllerMall = require("../controllers/mallController");
const ControllerSpot = require("../controllers/spotController");
const routes = express.Router();
const { authetication } = require("../middleware/auth"); // ini gw tambah pak supaya bisa bookingspotnya

routes.post("/login", ControllerUser.login);
routes.post("/register", ControllerUser.register);
// get all mals
routes.get("/malls", ControllerMall.getAllMalls);
// get all user by mall id
routes.get("/getAllTickets", Controller.getAllTickets);
routes.post("/getAllTickets", Controller.getAllTickets); //tambahan
routes.post("/addSlot", ControllerSpot.addSlot); //tambahan
routes.post("/bookings/:ParkingId", authetication, Controller.bookingSpot);
routes.post("/checkIn/:id", Controller.checkIn); // tambahan
routes.get("/spots/:MallId", ControllerSpot.getAllSpots);
// when user booking

module.exports = routes;
