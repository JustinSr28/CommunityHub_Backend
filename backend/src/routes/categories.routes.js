const express = require("express");

const categoryController = require("../controllers/category.controller");
const { protect } = require("../middleware/auth.middleware");
const { authorizeRoles } = require("../middleware/role.middleware");

const router = express.Router();



router.get("/", categoryController.getCategories);

router.get("/:id", categoryController.getCategoryById);

router.post("/", protect, authorizeRoles("admin"),categoryController.createCategory);

router.put("/:id", protect,authorizeRoles("admin"),categoryController.updateCategory);

router.delete("/:id",  protect, authorizeRoles("admin"),categoryController.deleteCategory);


module.exports = router;