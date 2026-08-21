const mongoose = require("mongoose");

const Event = require("../models/event.model");
const Registration = require("../models/registration.model");

const normalizePayload = (payload = {}) => {
  const normalized = {};

  if (payload.title !== undefined) {
    normalized.title = String(payload.title).trim();
  }

  if (payload.description !== undefined) {
    normalized.description = String(payload.description).trim();
  }

  if (payload.category !== undefined) {
    normalized.category = Number(payload.category);
  }

  if (payload.date !== undefined) {
    normalized.date = payload.date;
  }

  if (payload.time !== undefined) {
    normalized.time = payload.time;
  }

  if (payload.location !== undefined) {
    normalized.location = String(payload.location).trim();
  }

  if (payload.max_capacity !== undefined) {
    normalized.max_capacity = Number(payload.max_capacity);
  }

  if (payload.image !== undefined) {
    normalized.image = String(payload.image).trim();
  }

  if (payload.organizer !== undefined) {
    normalized.organizer = Number(payload.organizer);
  }

  if (payload.status !== undefined) {
    normalized.status = String(payload.status).trim();
  }

  return normalized;
};



// crd events
const listEvents = async () => {
  return Event.find().sort({ createdAt: -1 });
};


const findEventById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }

  return Event.findById(id);
};


const createEvent = async (payload) => {
  const normalized = normalizePayload(payload);

  return Event.create(normalized);
};


const updateEvent = async (id, payload) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }

  const normalized = normalizePayload(payload);

  return Event.findByIdAndUpdate(
    id,
    normalized,
    {
      new: true,
      runValidators: true
    }
  );
};


const removeEvent = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return false;
  }

  const registrations = await Registration.findOne({
    event: id
  });

  if (registrations) {
    return false;
  }

  const deleted = await Event.findByIdAndDelete(id);

  return Boolean(deleted);
};

//crud events terminasx----------------------------------

const getEventsByUser = async (userId) => {
  const registrations = await Registration.find({
    user: userId
  });

  const eventIds = registrations.map(
    registration => registration.event
  );

  return Event.find({
    _id: { $in: eventIds }
  });
};


const getAvailableEventsForUser = async (userId) => {
  const registrations = await Registration.find({
    user: userId
  });

  const eventIds = registrations.map(
    registration => registration.event
  );

  return Event.find({
    _id: { $nin: eventIds },
    max_capacity: { $gt: 0 }
  });
};


const getEventsByOrganizer = async (organizerId) => {
  return Event.find({
    organizer: Number(organizerId)
  }).sort({ createdAt: -1 });
};


//filters
const getFilteredEvents = async (filters = {}) => {

  const query = {};

  if (filters.category) {
    query.category = Number(filters.category);
  }

  if (filters.date) {
    query.date = filters.date;
  }

  if (filters.location) {
    query.location = filters.location;
  }

  if (filters.availability === "Disponible") {
    query.max_capacity = { $gt: 0 };
  }

  if (filters.availability === "Lleno") {
    query.max_capacity = 0;
  }

  if (filters.organizer) {
    query.organizer = Number(filters.organizer);
  }

  return Event.find(query).sort({
    createdAt: -1
  });
};


//admin dashboard
const loadTotalEvents = async () => {
  return Event.find();
};


const loadActiveEvents = async () => {
  return Event.find({
    status: "activo"
  });
};


const loadFinishedEvents = async () => {
  return Event.find({
    status: "finalizado"
  });
};

module.exports = {
  listEvents,
  findEventById,
  createEvent,
  updateEvent,
  removeEvent,

  getEventsByUser,
  getAvailableEventsForUser,
  getEventsByOrganizer,

  getFilteredEvents,

  loadTotalEvents,
  loadActiveEvents,
  loadFinishedEvents
};