const registrationService = require("../services/registration.service");

const getAllRegistrations = async (req, res, next) => {
  try {
    const registrations = await registrationService.getAllRegistrations();
    return res.json(registrations);
  } catch (err) {
    return next(err);
  }
};

const getRegistrationById = async (req, res, next) => {
  try {
    const registration = await registrationService.getRegistrationById(req.params.id);
    if (!registration) {
      return res.status(404).json({ message: "La inscripción no existe." });
    }
    return res.json(registration);
  } catch (err) {
    return next(err);
  }
};

const getRegistrationsByEvent = async (req, res, next) => {
  try {
    const registrations = await registrationService.getRegistrationsByEvent(req.params.id);
    return res.json(registrations);
  } catch (err) {
    return next(err);
  }
};

const getUsersByEvent = async (req, res, next) => {
  try {
    const userIds = await registrationService.getUsersByEvent(req.params.id);
    return res.json(userIds);
  } catch (err) {
    return next(err);
  }
};

const getRegistrationsByUser = async (req, res, next) => {
  try {
    const userId = req.params.id || req.user?.id;
    const registrations = await registrationService.getRegistrationsByUser(userId);
    return res.json(registrations);
  } catch (err) {
    return next(err);
  }
};

const editRegistration = async (req, res, next) => {
  try {
    const registration = await registrationService.editRegistration(req.params.id, req.body);
    if (!registration) {
      return res.status(404).json({ message: "La inscripción no existe." });
    }
    return res.json(registration);
  } catch (err) {
    return next(err);
  }
};

const addRegistration = async (req, res, next) => {
  try {
    const eventId = req.params.id;
    const userId = req.user._id;

    const result = await registrationService.createRegistration(
      eventId,
      userId
    );

    if (result.error === "not_found") {
      return res.status(404).json({
        message: "El evento no existe."
      });
    }

    if (result.error === "unavailable") {
      return res.status(409).json({
        message: "El evento no está disponible para inscripciones."
      });
    }

    if (result.error === "duplicate") {
      return res.status(409).json({
        message: "Ya estás inscrito en este evento."
      });
    }

    if (result.error === "full") {
      return res.status(409).json({
        message: "No hay espacios disponibles."
      });
    }

    return res.status(201).json(result.data);

  } catch (err) {
    return next(err);
  }
};

const removeRegistration = async (req, res, next) => {
  try {
    const eventId = req.params.id;
    const userId = req.user?.id || req.body.user;

    const deleted = await registrationService.removeRegistration(eventId, userId);

    if (!deleted) {
      return res.status(404).json({ message: "No se encontró la inscripción." });
    }
    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
};

const getRegistrationByEventAndUser = async (req, res, next) => {
  try {
    const eventId = req.params.eventId;
    const userId = req.user?.id || req.params.userId;

    const registration =
      await registrationService.getRegistrationByEventAndUser(
        eventId,
        userId
      );

    if (!registration) {
      return res.status(404).json({
        message: "El usuario no está inscrito en este evento."
      });
    }

    return res.json(registration);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getAllRegistrations,
  getRegistrationById,
  getRegistrationsByEvent,
  getUsersByEvent,
  getRegistrationsByUser,
  addRegistration,
  editRegistration,
  removeRegistration,
  getRegistrationByEventAndUser
};