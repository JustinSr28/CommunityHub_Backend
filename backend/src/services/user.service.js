const mongoose = require("mongoose");

const User = require("../models/user.model");
const Registration = require("../models/registration.model");

const normalizePayload = (payload = {}) => {
  const normalized = {};

  if (payload.name !== undefined) {
    normalized.name = String(payload.name).trim();
  }

  if (payload.lastName !== undefined) {
    normalized.lastName = String(payload.lastName).trim();
  }

  if (payload.email !== undefined) {
    normalized.email = String(payload.email).toLowerCase().trim();
  }

  if (payload.password !== undefined) {
    normalized.password = String(payload.password);
  }

  if (payload.urlPhoto !== undefined) {
    normalized.urlPhoto = String(payload.urlPhoto).trim();
  }

  if (payload.role !== undefined) {
    normalized.role = String(payload.role).trim();
  }

  if (payload.status !== undefined) {
    normalized.status = String(payload.status).trim();
  }

  if (payload.favorites !== undefined) {
    normalized.favorites = payload.favorites;
  }

  return normalized;
};


const bcrypt = require("bcryptjs");
// CRUD USERS

const listUsers = async () => {
  return User.find().sort({ createdAt: -1 });
};

const findUserById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }

  return User.findById(id);
};



const createUser = async (payload) => {

  const userData = {
    ...payload,
    email: payload.email.toLowerCase().trim()
  };

  if (payload.password) {
    userData.password = await bcrypt.hash(
      payload.password,
      10
    );
  }

  return User.create(userData);
};

const updateUser = async (id, payload) => {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }

  const normalized = normalizePayload(payload);
  if (payload.password && payload.password.trim() !== "") {
    normalized.password = await bcrypt.hash(
      payload.password,
      10
    );
  } else {
    delete normalized.password;
  }

  return User.findByIdAndUpdate(
    id,
    normalized,
    {
      new: true,
      runValidators: true
    }
  );
};

const removeUser = async (id) => {

  if (!mongoose.Types.ObjectId.isValid(id)) {

    return false;

  }

  const registrationExists = await Registration.exists({

    user: id

  });

  if (registrationExists) {

    return false;

  }

  const deleted = await User.findByIdAndDelete(id);

  return Boolean(deleted);

};


const userExists = async (email) => {
  return User.exists({
    email: String(email).toLowerCase().trim()
  });
};

const loadFavoriteEvents = async (userId) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return [];
  }

  const user = await User.findById(userId)
    .populate("favorites");

  if (!user) {
    return null;
  }

  return user.favorites || [];
};

//dasboar
const loadTotalUsers = async () => {
  return User.countDocuments();
};

const loadTotalOrganizers = async () => {
  return User.countDocuments({
    role: "organizer"
  });
};


//fav
const toggleFavorite = async (userId, eventId) => {

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return false;
  }

  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    return false;
  }

  const user = await User.findById(userId);

  if (!user) {
    return false;
  }

  const isFavorite = user.favorites.some(
    favorite => favorite.toString() === eventId
  );

  if (isFavorite) {

    user.favorites = user.favorites.filter(
      favorite => favorite.toString() !== eventId
    );

  } else {

    user.favorites.push(eventId);

  }

  await user.save();

  return true;
};

module.exports = {
  listUsers,
  findUserById,
  createUser,
  updateUser,
  removeUser,
  userExists,
  loadFavoriteEvents,
  loadTotalUsers,
  loadTotalOrganizers,
  toggleFavorite
};