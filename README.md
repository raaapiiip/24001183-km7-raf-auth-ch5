# Binar Car Rental API (BCR) - Chapter 5 Challenge

This repository contains the backend API for the Binar Car Rental application. The API is developed using Node.js and Express and leverages Sequelize ORM for data management with PostgreSQL. The application includes user authentication, role-based access control, and CRUD operations for managing car data.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Database Setup](#database-setup)
  - [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)

---

## Features

- **User Authentication**: Secure JWT-based authentication for login and registration.
- **Role-Based Access Control**: Access to certain API endpoints is restricted based on roles (`superadmin`, `admin`, and `member`).
- **CRUD Operations for Cars**: Allows authorized users to create, update, delete, and retrieve car data.
- **File Uploads**: Supports image uploads for cars.
- **Soft Deletion**: Implements soft deletion for car records.

## Technologies Used

- **Node.js**
- **Express**
- **Sequelize ORM** (PostgreSQL)
- **ImageKit** (for image upload)
- **JWT** (JSON Web Token) for authentication
- **Swagger** (API documentation)

---

## Getting Started

### Prerequisites

- **Node.js** and **npm**: Make sure Node.js and npm are installed.
- **PostgreSQL**: Ensure PostgreSQL is installed and running.

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/binar-car-rental-api.git
   cd binar-car-rental-api
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

### Database Setup

1. **Create a PostgreSQL database** for the application.

2. **Run database migrations**:

   ```bash
   npx sequelize-cli db:migrate
   ```

3. **Run database seeders** (if available):

   ```bash
   npx sequelize-cli db:seed:all
   ```

### Environment Variables

Create a `.env` file in the root directory of your project and add the following environment variables:

```env
# Server configuration
PORT=5000

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRED=1h

# Database (PostgreSQL)
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
DB_PORT=5432

# ImageKit (for image uploads)
IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key
IMAGEKIT_URL_ENDPOINT=your_url_endpoint
```

---

## API Documentation

The API endpoints are documented using Swagger. Once you start the server, you can access the documentation at:

```
http://localhost:5000/api-docs
```

### Sample Endpoints

Here are a few key API endpoints. For the complete documentation, refer to the Swagger docs.

#### Authentication

- **POST** `/auths/login`: User login to obtain JWT token.
- **POST** `/auths/register`: Register a new user.

#### User Management

- **POST** `/auths/add-admin`: Add a new admin (requires superadmin privileges).

#### Car Management

- **GET** `/cars`: Retrieve all cars (admin and superadmin only).
- **POST** `/cars`: Add a new car (requires admin or superadmin privileges).
- **PATCH** `/cars/:id`: Update car data by ID (requires ownership or superadmin privileges).
- **DELETE** `/cars/:id`: Soft delete car by ID (requires ownership or superadmin privileges).

### Error Handling

Each endpoint provides standardized error responses for common HTTP status codes:

- `400` Bad Request
- `401` Unauthorized
- `403` Forbidden
- `404` Not Found
- `500` Internal Server Error

---

## Contributing

Pull requests are welcome! For significant changes, please open an issue first to discuss what you would like to change.

--- 
