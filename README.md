# 📘 EDUMANAGER — STUDENT MANAGEMENT BACKEND SYSTEM

## 🔹 Short Description

**EduManager — A production-grade Student Management Backend System built with Express.js, MongoDB, Redis, JWT, and Swagger, featuring RBAC-based authentication, student CRUD operations, attendance tracking support, analytics-ready architecture, and scalable modular design.**

---

<p align="center">
  <img src="https://github.com/KarthickRamAlagar/StudentManger/blob/main/src/Screenshot%202026-06-16%20015535.png" alt="EduManager Banner" width="100%" height="50%">
</p>

<p align="center">

High-Performance Student Management Backend built using Express.js, MongoDB, Redis, JWT Authentication, RBAC Authorization, Student & Admin Management, and Swagger API Documentation.

</p>

---

## 📌 Overview

EduManager is a production-grade backend system designed for managing educational institutions efficiently and securely.

The system focuses on:

- Scalable Architecture
- Secure Authentication & Authorization
- Role-Based Access Control (RBAC)
- High-Performance Caching (Redis)
- Modular Backend Design
- API Documentation
- Extensible Academic Modules

The project demonstrates how real-world education platforms handle:

```bash
Authentication
User Management (Admin / Student / Teacher)
Student Records
Attendance (Extensible)
Courses (Extensible)
Analytics
Role-Based Access Control
Caching Layer
```
 ## 🛠 Technology Stack
| Layer             | Technology         |
| ----------------- | ------------------ |
| Runtime           | Node.js            |
| Framework         | Express.js         |
| Database          | MongoDB            |
| Cache Layer       | Redis              |
| Authentication    | JWT                |
| Authorization     | RBAC               |
| Validation        | Zod / Joi          |
| API Documentation | Swagger            |
| Security          | Helmet             |
| Rate Limiting     | Express Rate Limit |
| Password Hashing  | bcrypt             |


## 🏗 System Architecture
<p align="center"> <img src="https://github.com/KarthickRamAlagar/StudentManger/blob/main/src/Screenshot%202026-06-16%20013257.png" alt="EduManager Architecture" width="800" /> </p>


## 📦 Modules
<b> 🔐 Authentication Module</b>
 - User Registration
- Login / Logout
- JWT Access Token
- Refresh Token System
- Password Hashing
- Secure Session Handling

<b> 👤 User Management (RBAC)</b>
- Admin / Student / Teacher Roles
- Get All Users
- Get User by ID
- Update User Role
- Activate / Deactivate Users
- Soft Delete Users

<b> Student Management</b>
- Add Student
- Update Student
- Delete Student
- Get Student Details
- Search Students
- Filter by Class / Department

 <b> 📊 Analytics Module </b>
- Student Count Analytics
- Active vs Inactive Users
- Role Distribution Stats
- Performance-ready API Layer
  
## ⚡ Redis Caching Layer
<b> 
Used for: </b>

```bash
JWT Refresh Sessions
User Cache
Student Data Cache
Rate Limiting
Analytics Cache
```
## 🔐 Authentication Flow
```bash
User Login
    │
    ▼
Validate Credentials
    │
    ▼
Generate JWT Access Token
    │
    ▼
Generate Refresh Token
    │
    ▼
Store Refresh Token in Redis
    │
    ▼
Access Protected Routes via Middleware
```
## 🧩 Request Flow (System Design)
```bash
Client Request
      │
      ▼
Auth Middleware (JWT Verification)
      │
      ▼
RBAC Middleware (Role Check)
      │
      ▼
Controller Layer
      │
      ▼
Service Layer
      │
      ▼
Database (MongoDB)
      │
      ▼
Response to Client
```

## 📖 API Documentation

<b>Swagger Documentation: </b>
```bash
http://localhost:8000/api-docs
```
## 🚀 Installation
```bash
Clone Repository
git clone https://github.com/KarthickRamAlagar/StudentManger.git
Install Dependencies
npm install
```
<b>Environment Setup </b>
```bash
PORT=8000

MONGO_URI=

JWT_SECRET=
JWT_REFRESH_SECRET=

REDIS_URL=

Run Development Server
npm run dev

```

## 🎯 Future Improvements
```bash
Attendance System
Exam & Results Module
Fee Management System
Notification System (Email/SMS)
File Upload (Profile Images via Cloudinary)
Analytics Dashboard APIs
Microservices Architecture
Docker Deployment
CI/CD Pipeline
Queue System (BullMQ)

```
## 👨‍💻 Author

Karthick Ramalagar

Backend Developer

Built to demonstrate scalable Education Management System Architecture using:

- Express.js
- MongoDB
- Redis
- JWT
- Swagger
- RBAC
---
