# Voltiq — Electric Vehicle Marketplace ⚡

Voltiq is a web application for browsing and adding electric vehicle listings.
The project was created as part of an engineering thesis and focuses on building a working full-stack marketplace system.

![Example photo](https://jakubmrzyglod.usermd.net/assets/voltiq-example.jpg)

## Live Demo

The project is available here:

https://voltiqmarket.pl/

Access to the demo version may be restricted.
Demo credentials are shared with the supervisor and reviewers for evaluation purposes.
To receive access, please contact the author of the project.

## Overview

![Example photo](https://jakubmrzyglod.usermd.net/assets/voltiq-example2.png)

Voltiq is a platform for electric car offers. Users can browse listings, check vehicle details, use filters and add their own offers after creating an account.

The application includes both the client side and the server side. The frontend was built with React, while the backend uses Express and MongoDB.

## Features

- user registration and login
- authentication with JWT
- protected routes for logged-in users
- admin panel
- browsing car listings
- listing details page
- search and filtering
- adding new listings
- image upload
- user profiles
- responsive layout
- basic static pages such as About, Contact, Regulations, Privacy Policy and Cookies

## Technologies

### Frontend

- React
- Vite
- React Router
- Material UI
- JavaScript

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- multer
- dotenv

## Installation

The project consists of two parts:

- `voltiq-api` — backend
- `voltiq-web` — frontend

Both parts have to be started separately.

### 1. Clone the repository

```bash
git clone <repository-url>
cd voltiq
```

### 2. Database

Open MongoDB Compass and create a database named:

```text
voltiq
```

Create two collections:

```text
users
listings
```

Example data is available in:

```text
voltiq-api/database-data
```

Import the files into the matching collections:

```text
users.json    -> users
listings.json -> listings
```

### 3. Backend

Go to the backend directory:

```bash
cd voltiq-api
```

Install dependencies:

```bash
npm install
```

Create the `.env` file by renaming:

```text
.env.example -> .env
```

Example `.env` file:

```env
MONGO=mongodb://127.0.0.1:27017/voltiq
JWT_SECRET=qwertyuiop
```

Start the backend:

```bash
npm start
```

The backend should run on:

```text
http://localhost:3000
```

### 4. Frontend

Open another terminal and go to the frontend directory:

```bash
cd voltiq-web
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

The frontend should run on:

```text
http://localhost:5173
```

## Project Structure

```text
voltiq
├── voltiq-api
│   ├── controllers
│   ├── database-data
│   ├── models
│   ├── mongodb
│   ├── public
│   ├── routes
│   ├── utils
│   ├── server.js
│   └── package.json
│
└── voltiq-web
    ├── dist
    ├── public
    ├── src
    │   ├── admin
    │   ├── api
    │   ├── auth
    │   ├── components
    │   ├── constants
    │   ├── context
    │   ├── data
    │   ├── routes
    │   ├── theme
    │   └── utils
    ├── index.html
    └── package.json
```

## Summary

Voltiq is a full-stack marketplace application focused on electric vehicles.
It includes user accounts, authentication, listings, image upload, filtering, MongoDB data storage and a simple admin panel.
