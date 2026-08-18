const express = require("express");

const app = express();

app.use(express.json());

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
app.use('/api/auth', authRoutes);


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
