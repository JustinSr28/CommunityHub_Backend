const bcrypt = require('bcryptjs');
const User = require('../models/user.model.js');
const generateToken = require('../utils/generateToken');


// POST /api/auth/register
const register = async (req, res) => {
  try {

    const { name, lastName, email, password,urlPhoto } = req.body;

    if (!name || !lastName || !email || !password) {
      return res.status(400).json({ message: "Nombre, apellido, correo y contraseña son obligatorios" });
    }

    if (password.length < 3) {
      return res.status(400).json({
        message: "La contraseña debe tener al menos 3 caracteres"
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await User.findOne({
      email: normalizedEmail
    });

    if (existingUser) {
      return res.status(409).json({
        message: "El correo ya está registrado"
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name: name.trim(),
      lastName: lastName.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      urlPhoto: urlPhoto?.trim() || "",
      role: "user",
      status: "active"
    });

    const token = generateToken(user._id);

    return res.status(201).json({
      message: "Usuario registrado exitosamente",
      token,
      user: {
        id: user._id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        urlPhoto: user.urlPhoto,
        role: user.role,
        status: user.status
      }
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error al registrar el usuario",
      error: error.message
    });
  }
};
// POST /api/auth/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Correo y contraseña son obligatorios"
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({
      email: normalizedEmail
    }).select("+password");

    if (!user) {
      return res.status(401).json({
        message: "Credenciales inválidas"
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Credenciales inválidas"
      });
    }

    // Opcional pero recomendable:
    if (user.status !== "active") {
      return res.status(403).json({
        message: "El usuario está inactivo"
      });
    }

    const token = generateToken(user._id);

    return res.status(200).json({
      message: "Login exitoso",
      token,
      user: {
        id: user._id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        urlPhoto: user.urlPhoto,
        role: user.role,
        status: user.status
      }
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error al iniciar sesión",
      error: error.message
    });
  }
};


// POST /api/auth/logout
const logout = async (req, res) => {
  return res.status(200).json({
    message: "Sesión cerrada exitosamente"
  });
};
// GET /api/auth/me
const getMe = async (req, res) => {
  return res.status(200).json({
    user: {
      id: req.user._id,
      name: req.user.name,
      lastName: req.user.lastName,
      email: req.user.email,
      urlPhoto: req.user.urlPhoto,
      role: req.user.role,
      status: req.user.status
    },
  });
};


module.exports = { register, login, getMe, logout };