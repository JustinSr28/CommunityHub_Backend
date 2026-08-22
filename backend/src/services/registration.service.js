const mongoose = require("mongoose");

const Registration = require("../models/registration.model");
const Event = require("../models/event.model");

const normalizePayload = (payload = {}) => {
  const normalized = {};

  if (payload.status !== undefined) {
    normalized.status = String(payload.status).trim();
  }

  return normalized;
};

// CRUD registrations
const getAllRegistrations = async () => {
  return Registration.find().sort({ createdAt: -1 });
};

const getRegistrationById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }

  return Registration.findById(id);
};

const getRegistrationsByEvent = async (eventId) => {
  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    return [];
  }

  return Registration.find({ event: eventId });
};

const getUsersByEvent = async (eventId) => {
  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    return [];
  }

  const registrations = await Registration.find({ event: eventId });
  return registrations.map((registration) => registration.user);
};

const getRegistrationsByUser = async (userId) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return [];
  }

  return Registration.find({ user: userId });
};

// registration.service.js
const createRegistration = async (eventId, userId) => {
  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    return { error: "not_found" };
  }

  const existing = await Registration.findOne({ user: userId, event: eventId });
  if (existing) {
    return { error: "duplicate" };
  }

  const event = await Event.findById(eventId);
  if (!event) {
    return { error: "not_found" };
  }

  const eventoNoDisponible = ["cancelado", "finalizado"].includes(
    event.status.toLowerCase()
  );
  if (eventoNoDisponible) {
    return { error: "unavailable" };
  }

  
  const updatedEvent = await Event.findOneAndUpdate(
    { _id: eventId, max_capacity: { $gt: 0 } },
    { $inc: { max_capacity: -1 } },
    { new: true }
  );

  if (!updatedEvent) {
    return { error: "full" };
  }

  const registration = await Registration.create({
    user: userId,
    event: eventId,
    status: "confirmada"
  });

  return { data: registration };
};

const editRegistration = async (id, payload) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }

  const normalized = normalizePayload(payload);

  return Registration.findByIdAndUpdate(id, normalized, {
    new: true,
    runValidators: true
  });
};

const removeRegistration = async (eventId, userId) => {
  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    return null;
  }

  const deleted = await Registration.findOneAndDelete({ user: userId, event: eventId });

  if (deleted) {
    await Event.findByIdAndUpdate(eventId, { $inc: { max_capacity: 1 } });
  }

  return deleted;
};

module.exports = {
  getAllRegistrations,
  getRegistrationById,
  getRegistrationsByEvent,
  getUsersByEvent,
  getRegistrationsByUser,
  createRegistration,
  editRegistration,
  removeRegistration
};