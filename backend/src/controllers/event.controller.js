const eventsService = require("../services/event.service");

// CRUD EVENTS
const getEvents = async (req, res, next) => {
  try {
    const events = await eventsService.listEvents();

    return res.json(events);
  } catch (error) {
    return next(error);
  }
};


const getEventById = async (req, res, next) => {
  try {
    const event = await eventsService.findEventById(
      req.params.id
    );

    if (!event) {
      return res.status(404).json({
        message: "Evento no encontrado"
      });
    }

    return res.json(event);
  } catch (error) {
    return next(error);
  }
};

const createEvent = async (req, res, next) => {
  try {
    const event = await eventsService.createEvent(
      req.body
    );

    return res.status(201).json(event);
  } catch (error) {
    return next(error);
  }
};


const updateEvent = async (req, res, next) => {
  try {
    const event = await eventsService.updateEvent(
      req.params.id,
      req.body
    );

    if (!event) {
      return res.status(404).json({
        message: "Evento no encontrado"
      });
    }

    return res.json(event);
  } catch (error) {
    return next(error);
  }
};


const deleteEvent = async (req, res, next) => {
  try {
    const deleted = await eventsService.removeEvent(
      req.params.id
    );

    if (!deleted) {
      return res.status(404).json({
        message:
          "Evento no encontrado o no se puede eliminar porque tiene inscripciones"
      });
    }

    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
};

const getEventsByUser = async (req, res, next) => {
  try {
    const events = await eventsService.getEventsByUser(
      req.params.userId
    );

    return res.json(events);
  } catch (error) {
    return next(error);
  }
};

const getAvailableEventsForUser = async (req, res, next) => {
  try {
    const events =
      await eventsService.getAvailableEventsForUser(
        req.params.userId
      );

    return res.json(events);
  } catch (error) {
    return next(error);
  }
};

const getEventsByOrganizer = async (req, res, next) => {
  try {
    const events =
      await eventsService.getEventsByOrganizer(
        req.params.organizerId
      );

    return res.json(events);
  } catch (error) {
    return next(error);
  }
};

// FiltrOS
const getFilteredEvents = async (req, res, next) => {
  try {
    const events =
      await eventsService.getFilteredEvents(
        req.query
      );

    return res.json(events);
  } catch (error) {
    return next(error);
  }
};

//admin dahs
const getTotalEvents = async (req, res, next) => {
  try {
    const events =
      await eventsService.loadTotalEvents();

    return res.json(events);
  } catch (error) {
    return next(error);
  }
};


const getActiveEvents = async (req, res, next) => {
  try {
    const events =
      await eventsService.loadActiveEvents();

    return res.json(events);
  } catch (error) {
    return next(error);
  }
};


const getFinishedEvents = async (req, res, next) => {
  try {
    const events =
      await eventsService.loadFinishedEvents();

    return res.json(events);
  } catch (error) {
    return next(error);
  }
};


module.exports = {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,

  getEventsByUser,
  getAvailableEventsForUser,
  getEventsByOrganizer,

  getFilteredEvents,

  getTotalEvents,
  getActiveEvents,
  getFinishedEvents
};