# School Library Management API

A RESTful API for managing a school library built with Express.js and MongoDB. Supports CRUD operations for books, authors, students, and library attendants, as well as book borrowing and returning.

## Tech Stack

- Node.js / Express 5
- MongoDB / Mongoose
- Docker (for MongoDB)
- Swagger (API documentation)
- JWT Authentication

## Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Docker](https://www.docker.com/) (for MongoDB)

### 1. Clone the repository

```bash
git clone https://github.com/FagbenleLydia/school-library-api.git
cd school-library-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the example env file and update the values:

```bash
cp .env.example .env
```

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/school-library
JWT_SECRET=your-secret-here
```

### 4. Start MongoDB (Docker)

```bash
docker compose up -d
```

### 5. Start the server

```bash
npm run dev
```

The API will be running at `http://localhost:5000`.

## API Documentation (Swagger)

Once the server is running, open your browser and visit:

```
http://localhost:5000/api-docs
```

This provides an interactive Swagger UI where you can browse and test all endpoints.

## Project Structure

```
src/
  config/       - Database and Swagger configuration
  controllers/  - Route handler logic
  middleware/   - Validation and error handling
  models/       - Mongoose schemas
  routes/       - Express route definitions
server.js       - Application entry point
```
