const mongoose = require("mongoose");

const Category = require("../models/category.model");
const Event = require("../models/event.model");


const normalizePayload = (payload = {}) => {
  const normalized = {};

  if (payload.name !== undefined) {
    normalized.name = String(payload.name).trim();
  }

  if (payload.description !== undefined) {
    normalized.description = String(payload.description).trim();
  }

  return normalized;
};


// CRUD CATEGORIES

const listCategories = async () => {
  return Category.find().sort({ createdAt: -1 });
};

const findCategoryById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }
  return Category.findById(id);
};


const createCategory = async (payload) => {
  const normalized = normalizePayload(payload);

  return Category.create(normalized);
};


const updateCategory = async (id, payload) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }

  const normalized = normalizePayload(payload);

  return Category.findByIdAndUpdate(
    id,
    normalized,
    {
      new: true,
      runValidators: true
    }
  );
};


const removeCategory = async (id) => {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return false;
  }

  const eventExists = await Event.exists({
    category: id
  });

  if (eventExists) {
    return false;
  }

  const deleted = await Category.findByIdAndDelete(id);

  return Boolean(deleted);
};

module.exports = {
  listCategories,
  findCategoryById,
  createCategory,
  updateCategory,
  removeCategory
};