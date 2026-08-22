const express = require("express");
const router = express.Router();
const {
  getAllRegistrations,
  getRegistrationById,
  getRegistrationsByEvent,
  getUsersByEvent,
  getRegistrationsByUser,
  addRegistration,
  editRegistration,
  removeRegistration
} = require("../controllers/registration.controller");
// const { protect } = require("../middleware/auth.middleware");

router.get("/registrations", /* protect, */ getAllRegistrations);
router.get("/registrations/:id", /* protect, */ getRegistrationById);
router.put("/registrations/:id", /* protect, */ editRegistration);

router.get("/events/:id/registrations", getRegistrationsByEvent);
router.get("/events/:id/participants", /* protect, */ getUsersByEvent);
router.post("/events/:id/register", /* protect, */ addRegistration);
router.delete("/events/:id/register", /* protect, */ removeRegistration);

router.get("/users/:id/registrations", /* protect, */ getRegistrationsByUser);

module.exports = router;