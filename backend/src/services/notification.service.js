const mongoose = require("mongoose");
const Notification = require("../models/notification.model");

const getNotificationsByUser = async (userId) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return [];
  }

  return Notification.find({ user: userId })
    .populate("event", "title date")
    .sort({ createdAt: -1 });
};

module.exports = { getNotificationsByUser };