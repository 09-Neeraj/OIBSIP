# OIBSIP Web Development & Designing — Level 2

## Task 4: Login Authentication System

A secure and responsive Login Authentication System developed as part of the **Oasis Infobyte SIP Web Development & Designing Internship – Level 2 Task 4**.

The project provides user registration, secure login, JWT-based authentication, protected dashboard access, and logout functionality.

---

## 📌 Project Overview

This project demonstrates a complete authentication system using:

- HTML
- CSS
- JavaScript
- Node.js
- Express.js
- MongoDB
- Mongoose
- bcrypt
- JSON Web Token (JWT)
- cookie-parser
- CORS
- dotenv

The system securely handles user registration and authentication. Passwords are hashed before being stored in the database, and authenticated users receive a JWT stored in an HTTP-only cookie.

---

# 🚀 Features

- User Registration
- User Login
- Username validation
- Email validation
- Password validation
- Minimum 8-character password requirement
- Password must contain at least 1 number
- Duplicate username checking
- Duplicate email checking
- Password hashing using bcrypt
- JWT authentication
- HTTP-only authentication cookie
- Protected dashboard
- Display logged-in username
- Display logged-in email
- Logout functionality
- Responsive frontend
- Generic invalid credentials error
- MongoDB database integration

---

# 🛠️ Technologies Used

## Frontend

- HTML5
- CSS3
- JavaScript
- Fetch API

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- bcrypt
- JSON Web Token
- cookie-parser
- CORS
- dotenv

---

# 📂 Project Structure

```text
Web Development & Designing-Level 2-Login-Authentication-System/
│
├── backend/
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   └── auth.controller.js
│   │
│   ├── middleware/
│   │   └── auth.middleware.js
│   │
│   ├── models/
│   │   └── user.model.js
│   │
│   ├── routes/
│   │   └── auth.routes.js
│   │
│   ├── utils/
│   │   └── generateToken.js
│   │
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
├── Frontend/
│   │
│   ├── index.html
│   ├── login.html
│   ├── dashboard.html
│   ├── style.css
│   └── script.js
│
├── screenshots/
│   ├── register.png
│   ├── login.png
│   └── dashboard.png
│
└── README.md