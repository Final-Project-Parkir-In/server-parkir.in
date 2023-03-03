const express = require("express");
const ControllerUser = require("../controllers/controllers");

const Controller = require("../controllers/commonController");
const ControllerMall = require("../controllers/mallController");
const ControllerSpot = require("../controllers/spotController");
const routes = express.Router();

routes.post("/login", ControllerUser.login);
routes.post("/register", ControllerUser.register);
// get all mals
routes.get("/malls", ControllerMall.getAllMalls);
// get all user by mall id
routes.get("/spots/:MallId", ControllerSpot.getAllSpots);
// when user booking
routes.post("/bookings/:ParkingId", Controller.bookingSpot);
routes.post("/checkIn/:id", Controller.checkIn);

module.exports = routes;
