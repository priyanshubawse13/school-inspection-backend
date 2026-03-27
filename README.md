# 🏫 School Inspection App — Backend API

> RESTful API server for the School Inspection mobile application. Handles authentication, inspection data management, image uploads, and geolocation tracking.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

---

## Overview

Built during my tenure as a **Software Developer at Pragmatyc Global Pvt Ltd**, this backend powers a cross-platform mobile app used by school inspectors to conduct, document, and submit facility assessments in the field.

The API handles user authentication, CRUD operations on inspection records, image/file uploads via Multer, and serves data to the Flutter frontend.

---

## Features

- **Authentication** — JWT-based login/signup with role-based access (admin, inspector)
- **Inspection CRUD** — Create, read, update, and delete inspection records
- **Image Uploads** — Multer-powered file handling for inspection photos
- **Geolocation** — Store and query inspection coordinates
- **RESTful Design** — Clean route/controller/model separation (MVC pattern)
- **Error Handling** — Centralized error middleware with consistent JSON responses

---

## Tech Stack

| Component | Technology |
|-----------|-----------|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB (Mongoose ODM) |
| Auth | JWT (jsonwebtoken + bcrypt) |
| File Upload | Multer |
| Architecture | MVC (routes → controllers → models) |

---

## Project Structure

```
school-inspection-backend/
├── controllers/       # Business logic handlers
├── models/            # Mongoose schemas (User, Inspection, School)
├── routes/            # Express route definitions
├── scripts/           # DB seed scripts
├── uploads/           # Uploaded inspection images
├── server.js          # App entry point
├── package.json
└── .gitignore
```

---

## Quick Start

```bash
# 1. Clone
git clone https://github.com/priyanshubawse13/school-inspection-backend.git
cd school-inspection-backend

# 2. Install dependencies
npm install

# 3. Set environment variables
#    Create a .env file with:
#    MONGO_URI=your_mongodb_connection_string
#    JWT_SECRET=your_jwt_secret
#    PORT=5000

# 4. Start the server
node server.js
# or
npm start
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login and receive JWT |
| GET | `/api/inspections` | List all inspections |
| POST | `/api/inspections` | Create new inspection |
| GET | `/api/inspections/:id` | Get inspection by ID |
| PUT | `/api/inspections/:id` | Update inspection |
| DELETE | `/api/inspections/:id` | Delete inspection |
| POST | `/api/upload` | Upload inspection image |

---

## Related

- **Frontend (Flutter):** [school_inspection_app](https://github.com/priyanshubawse13/school_inspection_app)

---

## Author

**Priyanshu Bawse** — Software Developer @ Pragmatyc Global → M.S. Computer Engineering @ Iowa State University

## License

MIT
