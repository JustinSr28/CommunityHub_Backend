const categoryService = require("../services/category.service");

// CRUD CATEGORY

const getCategories = async (req, res, next) => {
  try {
    const categories = await categoryService.listCategories();

    return res.json(categories);
  } catch (error) {
    return next(error);
  }
};


const getCategoryById = async (req, res, next) => {
  try {
    const category = await categoryService.findCategoryById(
      req.params.id
    );

    if (!category) {
      return res.status(404).json({
        message: "Categoría no encontrada"
      });
    }

    return res.json(category);
  } catch (error) {
    return next(error);
  }
};


const createCategory = async (req, res, next) => {
  try {
    const category = await categoryService.createCategory(
      req.body
    );

    return res.status(201).json(category);
  } catch (error) {
    return next(error);
  }
};


const updateCategory = async (req, res, next) => {
  try {
    const category = await categoryService.updateCategory(
      req.params.id,
      req.body
    );

    if (!category) {
      return res.status(404).json({
        message: "Categoría no encontrada"
      });
    }

    return res.json(category);
  } catch (error) {
    return next(error);
  }
};


const deleteCategory = async (req, res, next) => {
  try {
    const deleted = await categoryService.removeCategory(
      req.params.id
    );

    if (!deleted) {
      return res.status(404).json({
        message:
          "Categoría no encontrada o no se puede eliminar porque está asociada a uno o más eventos"
      });
    }

    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
};


module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};