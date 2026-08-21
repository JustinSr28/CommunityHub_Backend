const express = require("express");

const eventController = require("../controllers/event.controller");

const router = express.Router();


router.get("/", eventController.getEvents);

router.get("/filter", eventController.getFilteredEvents);

router.get( "/user/:userId/available", eventController.getAvailableEventsForUser );

router.get( "/user/:userId", eventController.getEventsByUser );

router.get( "/organizer/:organizerId", eventController.getEventsByOrganizer );

router.get( "/dashboard/total", eventController.getTotalEvents );

router.get("/dashboard/active", eventController.getActiveEvents);

router.get( "/dashboard/finished", eventController.getFinishedEvents );

router.get("/:id", eventController.getEventById);

router.post("/", eventController.createEvent);

router.put("/:id", eventController.updateEvent);

router.delete("/:id", eventController.deleteEvent);


module.exports = router;