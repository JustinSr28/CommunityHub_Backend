const express = require("express");

const eventController = require("../controllers/event.controller");
const { protect } = require("../middleware/auth.middleware");
const { authorizeRoles } = require("../middleware/role.middleware");

const router = express.Router();



router.get("/", eventController.getEvents);

router.get("/filter", eventController.getFilteredEvents);

router.get("/:id", eventController.getEventById);

router.get( "/user/:userId/available", protect, eventController.getAvailableEventsForUser );

router.get("/user/:userId", protect,eventController.getEventsByUser );

router.get( "/organizer/:organizerId", protect,eventController.getEventsByOrganizer);


router.get("/dashboard/total", protect, authorizeRoles("admin"),eventController.getTotalEvents );

router.get( "/dashboard/active", protect,authorizeRoles("admin"), eventController.getActiveEvents );

router.get( "/dashboard/finished", protect, authorizeRoles("admin"), eventController.getFinishedEvents );

router.post( "/", protect,authorizeRoles("admin", "organizer"), eventController.createEvent );

router.put( "/:id", protect,authorizeRoles("admin", "organizer"),eventController.updateEvent );

router.delete( "/:id", protect, authorizeRoles("admin", "organizer"),eventController.deleteEvent );


module.exports = router;