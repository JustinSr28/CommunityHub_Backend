const express = require("express");

const userController = require("../controllers/user.controller");
const { protect } = require("../middleware/auth.middleware");
const { authorizeRoles } = require("../middleware/role.middleware");
const router = express.Router();

router.get("/",  protect,userController.getUsers);

router.get("/exists", protect,userController.checkUserExists);

router.get("/dashboard/total", protect, authorizeRoles("admin"),userController.getTotalUsers);

router.get("/dashboard/organizers",protect, authorizeRoles("admin"), userController.getTotalOrganizers);

router.get("/:id", protect,userController.getUserById);

router.post("/",protect, authorizeRoles("admin"), userController.createUser);

router.put("/:id",protect, userController.updateUser);

router.delete("/:id",protect, authorizeRoles("admin"), userController.deleteUser);

router.get("/:id/favorites", protect,userController.getFavoriteEvents);

router.post("/:userId/favorites/:eventId",protect,userController.toggleFavorite);

module.exports = router;
