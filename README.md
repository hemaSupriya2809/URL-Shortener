# URL Shortener with Analytics

A full-stack URL Shortener application that allows authenticated users to create short URLs, manage links, and track analytics such as click count, creation date, last visited time, and recent visit history.

---

# Project Links

## GitHub Repository
https://github.com/hemaSupriya2809/URL-Shortener/tree/main

## Demo Video
https://youtu.be/PTgISlrLTpI?feature=shared

---

# Features

## Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes

## URL Shortening
- Generate unique short URLs
- URL validation
- Server-side redirection

## Dashboard
- View all created URLs
- Display original URL
- Display short URL
- Display creation date
- Display click count
- Delete URLs
- Copy short URLs

## Analytics
- Total click count
- Last visited time
- Recent visit history

## User Interface
- Responsive design
- Form validation
- Loading indicators
- Success and error messages

---

# Tech Stack

## Frontend
- React.js
- Tailwind CSS
- Axios

## Backend
- Node.js
- Express.js

## Database
- MongoDB

## Authentication
- JWT
- bcrypt

---

# Setup Instructions

## Clone Repository

```bash
git clone <repository-url>
cd url-shortener
```

## Backend Setup

```bash
cd backend
npm install
npm start
```

Create a .env file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
BASE_URL=http://localhost:5000
```

## Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

# Assumptions Made

- Every generated short URL is unique.
- Users can only manage their own URLs.
- Analytics are recorded whenever a short URL is visited.
- MongoDB is used as the primary database.
- Deleted URLs cannot be recovered.
- JWT is used for secure authentication.

---

# AI Planning Document

## Planning the Application

### Step 1: Requirement Analysis
- Understand URL shortening workflow
- Define authentication requirements
- Define analytics tracking requirements

### Step 2: Database Design

#### Users Collection

```json
{
  "_id": "",
  "name": "",
  "email": "",
  "password": ""
}
```

#### URLs Collection

```json
{
  "_id": "",
  "userId": "",
  "originalUrl": "",
  "shortCode": "",
  "createdAt": "",
  "clicks": 0
}
```

#### Analytics Collection

```json
{
  "_id": "",
  "urlId": "",
  "visitedAt": ""
}
```

### Step 3: Backend Development
- Authentication APIs
- URL Shortening APIs
- Analytics APIs
- Redirect APIs

### Step 4: Frontend Development
- Login Page
- Register Page
- Dashboard
- URL Creation Form
- Analytics Page

### Step 5: Testing and Deployment
- API Testing
- UI Testing
- Deployment

---

# Architecture Diagram

```text
+-------------------+
|       User        |
+---------+---------+
          |
          v
+-------------------+
| React Frontend    |
+---------+---------+
          |
          | REST APIs
          v
+-------------------+
| Express Backend   |
+---------+---------+
          |
          v
+-------------------+
| MongoDB Database  |
+-------------------+

Short URL Request
      |
      v
Backend Redirect
      |
      v
Original URL

Analytics Tracking
      |
      v
Store Timestamp + Update Click Count
```

---

# Sample Outputs

## URL Creation Response

```json
{
  "originalUrl": "https://example.com",
  "shortCode": "abc123",
  "shortUrl": "https://yourdomain.com/abc123"
}
```

## Analytics Response

```json
{
  "clicks": 25,
  "lastVisited": "2026-06-14T10:30:00Z"
}
```

---

# Screenshots

Add screenshots of:

1. Login Page
2. Registration Page
3. Dashboard
4. URL Creation Page
5. Analytics Page
6. MongoDB Collections

---

# Future Enhancements

- QR Code Generation
- Custom Alias Support
- Link Expiry
- Device Analytics
- Browser Analytics
- Geolocation Analytics
- Daily Click Charts
- Bulk URL Upload

---

# Author

Ashok J

---

# Hackathon Attribution

This project is a part of a hackathon run by https://katomaran.com
