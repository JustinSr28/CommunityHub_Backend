const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.middleware");
const { authorizeRoles } = require("../middleware/role.middleware");
const {
  getAdminStats,
  getOrganizerStats,
  getUserStats
} = require("../controllers/dashboard.controller");

router.get("/dashboard/admin", protect, authorizeRoles("admin"), getAdminStats);

router.get(
  "/dashboard/organizer",
  protect,
  authorizeRoles("organizer", "admin"),
  getOrganizerStats
);

router.get(
  "/dashboard/user",
  protect,
  authorizeRoles("user", "organizer", "admin"),
  getUserStats
);

module.exports = router;