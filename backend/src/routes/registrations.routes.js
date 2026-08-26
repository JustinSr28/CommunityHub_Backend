const express = require("express");

const registrationController = require("../controllers/registration.controller");
const { protect } = require("../middleware/auth.middleware");
const { authorizeRoles } = require("../middleware/role.middleware");


const router = express.Router();


router.get("/", protect, registrationController.getAllRegistrations);

router.get("/:id", protect,registrationController.getRegistrationById);

router.get( "/event/:id", protect, registrationController.getRegistrationsByEvent );

router.get( "/event/:id/users",protect,registrationController.getUsersByEvent );

router.get( "/user/:id", protect,registrationController.getRegistrationsByUser );

router.get( "/event/:eventId/user/:userId",protect, registrationController.getRegistrationByEventAndUser );

router.post( "/event/:id", protect,registrationController.addRegistration );

router.put("/:id", protect,registrationController.editRegistration);

router.delete( "/event/:id",protect,registrationController.removeRegistration);


module.exports = router;