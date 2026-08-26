const notificationService = require("../services/notification.service");

const getMyNotifications = async (req, res, next) => {
  try {
    const notifications = await notificationService.getNotificationsByUser(req.user.id);
    return res.json(notifications);
  } catch (error) {
    return next(error);
  }
};

module.exports = { getMyNotifications };