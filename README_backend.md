
# 🏫 School Inspection Backend

## 📌 Overview
This is the backend for the **School Inspection App** built using **Node.js**, **Express.js**, and **MongoDB**. It handles user authentication, inspection submissions with image uploads, and protected routes using JWT.

## 🚀 Features
- User login with JWT authentication
- Image upload using `multer`
- School and inspection data stored in MongoDB
- Protected routes for inspections
- Structured controller and model-based architecture

## 📁 Folder Structure
```
school-inspection-backend/
├── controllers/
├── models/
├── routes/
├── uploads/
├── .env
├── server.js
└── package.json
```

## ⚙️ Technologies Used
- Node.js
- Express.js
- MongoDB + Mongoose
- Multer
- bcryptjs & jsonwebtoken
- dotenv

## 🔐 Environment Variables
Create a `.env` file and add:
```
MONGO_URI=mongodb+srv://<your-cluster-uri>
JWT_SECRET=<your-jwt-secret>
PORT=5050
```

## ▶️ Run Locally
```bash
npm install
npm run dev
```

Server starts at `http://localhost:5050`

## 📮 API Endpoints

### 🔑 Auth
- `POST /api/auth/login`

### 🏫 Inspections
- `POST /api/inspection/submit`  
  Requires: Bearer Token  
  Form Data:
    - school
    - ratings[infrastructure]
    - ratings[cleanliness]
    - ratings[teacherPresence]
    - location[lat]
    - location[lng]
    - image (file)
