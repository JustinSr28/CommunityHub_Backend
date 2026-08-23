const express = require("express");

const eventController = require("../controllers/event.controller");
const registrationController = require("../controllers/registration.controller");

const { protect } = require("../middleware/auth.middleware");
const { authorizeRoles } = require("../middleware/role.middleware");

const router = express.Router();

router.post("/:id/register", protect, registrationController.addRegistration);
router.delete("/:id/register", protect, registrationController.removeRegistration);


// ===============================
// GET
// ===============================

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


// ===============================
// GET EVENT BY ID
// ===============================
// Esta debe ir DESPUÉS de las rutas específicas.

router.get(
  "/:id",
  eventController.getEventById
);


// ===============================
// POST
// ===============================

router.post(
  "/",
  protect,
  authorizeRoles("admin", "organizer"),
  eventController.createEvent
);


// ===============================
// PUT
// ===============================

router.put(
  "/:id",
  protect,
  authorizeRoles("admin", "organizer"),
  eventController.updateEvent
);


// ===============================
// DELETE
// ===============================

router.delete(
  "/:id",
  protect,
  authorizeRoles("admin", "organizer"),
  eventController.deleteEvent
);


module.exports = router;