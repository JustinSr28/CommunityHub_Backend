const express = require("express");

const eventController = require("../controllers/event.controller");
const registrationController = require("../controllers/registration.controller");

const { protect } = require("../middleware/auth.middleware");
const { authorizeRoles } = require("../middleware/role.middleware");

const router = express.Router();

router.post("/:id/register", protect, registrationController.addRegistration);
router.delete("/:id/register", protect, registrationController.removeRegistration);

router.get("/", eventController.getEvents);

router.get("/filter", eventController.getFilteredEvents);

router.get("/locations", eventController.getEventLocations);

router.get(
  "/dashboard/total",
  protect,
  authorizeRoles("admin"),
  eventController.getTotalEvents
);

router.get(
  "/dashboard/active",
  protect,
  authorizeRoles("admin"),
  eventController.getActiveEvents
);

router.get(
  "/dashboard/finished",
  protect,
  authorizeRoles("admin"),
  eventController.getFinishedEvents
);

router.get(
  "/user/:userId/available",
  protect,
  eventController.getAvailableEventsForUser
);

router.get(
  "/user/:userId",
  protect,
  eventController.getEventsByUser
);

router.get(
  "/organizer/:organizerId",
  protect,
  eventController.getEventsByOrganizer
);


router.get(
  "/:id",
  eventController.getEventById
);



router.post(
  "/",
  protect,
  authorizeRoles("admin", "organizer"),
  eventController.createEvent
);



router.put(
  "/:id",
  protect,
  authorizeRoles("admin", "organizer"),
  eventController.updateEvent
);


router.delete(
  "/:id",
  protect,
  authorizeRoles("admin", "organizer"),
  eventController.deleteEvent
);


module.exports = router;