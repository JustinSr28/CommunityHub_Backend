const express = require("express");
const cors = require("cors")
const app = express();
app.disable('etag');
app.use(express.json());

app.use(cors({
  origin: "http://localhost:3001"
}));

//Para developer o guia
app.get("/", (req, res) => {
  res.json({
    message: "Backend",
    endpoints: {
      
    }
  });
});


//RUTAS
const authRoutes = require('./routes/auth.routes');
const eventsRoutes = require('./routes/events.routes');
const usersRoutes = require('./routes/users.routes');
const categoryRoutes = require('./routes/categories.routes');
const registrationsRoutes = require('./routes/registrations.routes');
const dashboardRoutes = require('./routes/dashboard.routes');

app.use('/api/auth', authRoutes);
app.use("/api/events", eventsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/registrations", registrationsRoutes);
app.use("/api", dashboardRoutes);

//Manejo de errores
app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

app.use((error, req, res, next) => {
  if (error.name === "ValidationError") {
    const message = Object.values(error.errors)
      .map((item) => item.message)
      .join(", ");

    return res.status(400).json({ message });
  }

  if (error.name === "CastError") {
    return res.status(400).json({ message: "ID invalido" });
  }

  if (res.headersSent) {
    return next(error);
  }

  return res.status(error.status || 500).json({
    message: error.message || "Error interno del servidor"
  });
});

module.exports = app;