# 🌸 Amuna – API Backend

## 📌 Descripción del Proyecto
**Amuna** 
es una API diseñada para una plataforma de empoderamiento económico y laboral para mujeres en Colombia. El sistema busca resolver la problemática de falta de acceso a oportunidades laborales, educativas y de emprendimiento, especialmente para mujeres sin experiencia previa, madres cabeza de hogar y amas de casa.  

Esta API proporciona la estructura base para el manejo de usuarias, empleos, cursos, comunidad y emprendimientos, integrando autenticación, notificaciones y control de roles.

## 👥 Roles de Cada Integrante
Equipo conformado por 5 integrantes. Roles por definir.

| Integrante | Rol |
|------------|------|
| *Melissa Montoya* | *Backend Developer* |
| *Keiberlys Guédez* | *Leader* |
| *Valery Macias* | *Backend Developer* |
| *Marisol Prado* | *Relation developer* |
| *Leidy Hernandez* | *Backend Developer* |

## 🖥️ Instrucciones para Ejecutar la API Localmente

### Requisitos Previos
- Node.js (última versión)  
- Docker  
- PostgreSQL (si no se usa Docker)

### Instalación de dependencias
npm install

### Ejecución local
npm run start:dev

### Ejecución con Docker
docker compose up --build

## 🔐 Variables de Entorno Requeridas
Crear un archivo `.env` con las siguientes variables:

DATABASE_URL=
DB_HOST=
DB_PORT=
DB_USER=
DB_PASS=
DB_NAME=
JWT_SECRET=
EMAIL_USER=
EMAIL_PASS=
EMAIL_FROM=

## 🔗 Endpoints Principales

### Autenticación
- POST /auth/register
- POST /auth/login
- POST /auth/logout

### Usuarios
- GET /users/me
- PATCH /users/me
- GET /users (Admin)

### Bolsa de Empleo
- POST /jobs/create
- GET /jobs
- GET /jobs/:id
- PATCH /jobs/:id
- POST /jobs/:id/apply

### Academia de Capacitación
- GET /courses
- POST /courses/create
- POST /courses/:id/enroll

### Comunidad
- POST /posts/create
- GET /posts
- POST /posts/:id/comment

### Emprendimiento
- POST /business/create
- GET /business

### Email
- POST /email/send

## 🧪 Pruebas Unitarias y Evidencias

### Qué pruebas se implementaron
*Sawgger*

### Resultado de la ejecución
Corriendo*  
(Añadir capturas cuando existan)

## 📁 Carpeta de Evidencias
Debe incluir:
- Capturas de Postman  
- Capturas de Swagger  
- Evidencia de pruebas unitarias  
- Funcionamiento general de los módulos  

*Aún no hay evidencias generadas.*

## 🚀 Estado del Proyecto
**En desarrollo**
