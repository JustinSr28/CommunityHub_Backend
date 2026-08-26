const userService = require("./user.service");
const eventsService = require("./event.service");
const registrationService = require("./registration.service");
const notificationService = require("./notification.service"); 

const getUserStats = async (userId) => {
  const [registeredEvents, favorites, notifications] = await Promise.all([
    eventsService.getEventsByUser(userId),
    userService.loadFavoriteEvents(userId),
    notificationService.getNotificationsByUser(userId)
  ]);

  const today = new Date();

  const upcoming = registeredEvents.filter(
    (event) => event.status === "activo" && new Date(event.date) >= today
  );

  const history = registeredEvents.filter(
    (event) => event.status === "finalizado" || new Date(event.date) < today
  );

  return {
    upcoming,
    registered: registeredEvents,
    favorites,
    history,
    notifications
  };
};


const getAdminStats = async () => {
  const [
    totalUsers,
    totalOrganizers,
    totalEvents,
    activeEvents,
    finishedEvents,
    totalRegistrations
  ] = await Promise.all([
    userService.loadTotalUsers(),
    userService.loadTotalOrganizers(),
    eventsService.loadTotalEvents(),
    eventsService.loadActiveEvents(),
    eventsService.loadFinishedEvents(),
    registrationService.getTotalRegistrations()
  ]);

  return {
    totalUsers,
    totalOrganizers,
    totalEvents: totalEvents.length,
    activeEvents: activeEvents.length,
    finishedEvents: finishedEvents.length,
    totalRegistrations
  };
};

const getOrganizerStats = async (organizerId) => {
  const events = await eventsService.getEventsByOrganizer(organizerId);

  const eventsWithParticipants = await Promise.all(
    events.map(async (event) => {
      const participantCount = await registrationService.countRegistrationsByEvent(event._id);
      return {
        id: event._id,
        title: event.title,
        date: event.date,
        status: event.status,
        availableCapacity: event.max_capacity,
        participantCount
      };
    })
  );

  const today = new Date();

  return {
    totalCreated: events.length,
    upcoming: eventsWithParticipants.filter(
      (e) => e.status === "activo" && new Date(e.date) >= today
    ).length,
    cancelled: eventsWithParticipants.filter((e) => e.status === "cancelado").length,
    events: eventsWithParticipants
  };
};




module.exports = { getAdminStats, getOrganizerStats, getUserStats };

