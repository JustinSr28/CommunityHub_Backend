const categoriesService = require("../services/category.service");

const getCategories = async (req, res, next) => {
  try {
    const categories = await categoriesService.listCategories();
    return res.json(categories);
  } catch (error) {
    return next(error);
  }
};

const getCategoryById = async (req, res, next) => {
  try {
    const category = await categoriesService.findCategoryById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }

    return res.json(category);
  } catch (error) {
    return next(error);
  }
};

const createCategory = async (req, res, next) => {
  try {
    const category = await categoriesService.createCategory(req.body);
    return res.status(201).json(category);
  } catch (error) {
    return next(error);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const category = await categoriesService.updateCategory(
      req.params.id,
      req.body
    );

    if (!category) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }

    return res.json(category);
  } catch (error) {
    return next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const deleted = await categoriesService.removeCategory(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Categoría no encontrada" });
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