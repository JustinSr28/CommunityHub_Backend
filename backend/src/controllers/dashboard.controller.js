const dashboardService = require("../services/dashboard.service");

const getAdminStats = async (req, res, next) => {
  try {
    const stats = await dashboardService.getAdminStats();
    return res.json(stats);
  } catch (error) {
    return next(error);
  }
};

const getOrganizerStats = async (req, res, next) => {
  try {
    const stats = await dashboardService.getOrganizerStats(req.user.id);
    return res.json(stats);
  } catch (error) {
    return next(error);
  }
};

const getUserStats = async (req, res, next) => {
  try {
    const stats = await dashboardService.getUserStats(req.user.id);
    return res.json(stats);
  } catch (error) {
    return next(error);
  }
};

module.exports = { getAdminStats, getOrganizerStats, getUserStats };


