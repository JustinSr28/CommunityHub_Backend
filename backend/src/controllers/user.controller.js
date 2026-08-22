const userService = require("../services/user.service");


const getUsers = async (req, res, next) => {
  try {
    const users = await userService.listUsers();

    return res.json(users);
  } catch (error) {
    return next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await userService.findUserById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "El usuario no existe."
      });
    }

    return res.json(user);
  } catch (error) {
    return next(error);
  }
};


const createUser = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);

    return res.status(201).json(user);
  } catch (error) {
    return next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const user = await userService.updateUser(
      req.params.id,
      req.body
    );

    if (!user) {
      return res.status(404).json({
        message: "El usuario no existe."
      });
    }

    return res.json(user);
  } catch (error) {
    return next(error);
  }
};


const deleteUser = async (req, res, next) => {
  try {
    const deleted = await userService.removeUser(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        message:
          "El usuario no existe o no se puede eliminar porque tiene inscripciones."
      });
    }

    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
};


const checkUserExists = async (req, res, next) => {
  try {
    const exists = await userService.userExists(req.query.email);

    return res.json({
      exists
    });
  } catch (error) {
    return next(error);
  }
};


const getFavoriteEvents = async (req, res, next) => {
  try {
    const userId = req.params.id || req.user?.id;

    const favorites = await userService.loadFavoriteEvents(userId);

    if (favorites === null) {
      return res.status(404).json({
        message: "El usuario no existe."
      });
    }

    return res.json(favorites);
  } catch (error) {
    return next(error);
  }
};


const toggleFavorite = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.params.userId;
    const eventId = req.params.eventId;

    const result = await userService.toggleFavorite(
      userId,
      eventId
    );

    if (!result) {
      return res.status(404).json({
        message: "No se pudo actualizar el favorito."
      });
    }

    return res.status(200).json({
      message: "Favorito actualizado correctamente."
    });
  } catch (error) {
    return next(error);
  }
};

// Dashboard
const getTotalUsers = async (req, res, next) => {
  try {
    const total = await userService.loadTotalUsers();

    return res.json({
      total
    });
  } catch (error) {
    return next(error);
  }
};

const getTotalOrganizers = async (req, res, next) => {
  try {
    const total = await userService.loadTotalOrganizers();

    return res.json({
      total
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  checkUserExists,
  getFavoriteEvents,
  toggleFavorite,
  getTotalUsers,
  getTotalOrganizers
};