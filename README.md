# CommunityHub - Backend

Backend de la plataforma **CommunityHub**, encargado de gestionar usuarios, actividades, inscripciones, favoritos, categorías y notificaciones.

Fue desarrollado con **Node.js, Express.js y MongoDB**, implementando autenticación mediante JWT, autorización por roles y una API REST para la comunicación con el frontend Nuxt.

---

## Funcionalidad

* Registro e inicio de sesión.
* Autenticación mediante JWT.
* Autorización según roles.
* Gestión de usuarios.
* CRUD de actividades.
* Gestión de categorías.
* Inscripciones a actividades.
* Cancelación de inscripciones.
* Gestión de favoritos.
* Notificaciones.
* Búsqueda y filtros.
* Estadísticas.
* Integración con AWS Lambda.

---

## Tecnologías implementadas

* **Node.js**
* **Express.js**
* **MongoDB**
* **Mongoose**
* **JWT**
* **bcrypt**
* **dotenv**
* **CORS**
* **REST API**
* **AWS Lambda**
* **Git / GitHub**

---

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/JustinSr28/CommunityHub_Backend.git
```

Ingresar al proyecto:

```bash
cd CommunityHub_Backend
```

Instalar dependencias:

```bash
npm install
```

Configurar el archivo `.env`:


Ejecutar el servidor:

```bash
npm start
```

Para desarrollo:

```bash
npm run dev
```

El backend estará disponible en:

```text
http://localhost:3000
```

---

## API REST

### Autenticación

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
POST /api/auth/logout
```

### Usuarios

```text
GET    /api/users
GET    /api/users/:id
PUT    /api/users/:id
DELETE /api/users/:id
```

### Actividades

```text
GET    /api/events
GET    /api/events/:id
POST   /api/events
PUT    /api/events/:id
DELETE /api/events/:id
```

### Inscripciones

```text
POST   /api/events/:id/register
DELETE /api/events/:id/register
GET    /api/users/me/registrations
```

### Favoritos

```text
POST   /api/events/:id/favorite
DELETE /api/events/:id/favorite
GET    /api/users/me/favorites
```

---

## Autenticación y roles

El backend utiliza **JWT** para proteger los endpoints.

CommunityHub cuenta con tres roles:

**Administrador**

* Gestionar usuarios.
* Gestionar actividades.
* Gestionar categorías.
* Consultar estadísticas.

**Organizador**

* Crear actividades.
* Editar sus actividades.
* Cancelar actividades.
* Consultar participantes.

**Usuario**

* Consultar actividades.
* Inscribirse.
* Cancelar inscripciones.
* Gestionar favoritos.
* Consultar notificaciones.

---

## MongoDB

El sistema utiliza las siguientes colecciones:

```text
users
events
categories
registrations
notifications
```

---


## Seguridad

El backend implementa:

* JWT.
* Contraseñas protegidas con bcrypt.
* Middleware de autenticación.
* Middleware de autorización.
* Validación de datos.
* Variables de entorno.
* CORS.
* Protección de endpoints.
* Manejo de errores.

---

## Scripts

```bash
npm install
npm start
npm run dev
```

---

## Objetivo

Proporcionar una **API REST segura y organizada** que gestione la lógica de negocio de CommunityHub y permita la comunicación entre el frontend Nuxt, MongoDB y los servicios cloud utilizados por la plataforma.
