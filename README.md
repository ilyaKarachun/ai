# JSONPlaceholder API Clone

A NestJS-based clone of the JSONPlaceholder API with extended features including authentication, full CRUD operations, and containerized deployment.

## Features

- Full REST API implementation
- JWT-based authentication
- PostgreSQL database integration
- Docker and Docker Compose support
- Swagger API documentation
- Data seeding with example users

## Prerequisites

- Node.js (v18 or later)
- Docker and Docker Compose
- PostgreSQL (if running locally)

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd jsonplaceholder-api
```

2. Install dependencies:
```bash
npm install
```

3. Start the application using Docker Compose:
```bash
docker-compose up -d
```

The API will be available at http://localhost:3000

## API Documentation

Once the application is running, you can access the Swagger documentation at:
http://localhost:3000/api

## Authentication

The API uses JWT tokens for authentication. To access protected endpoints:

1. Register a new user:
```bash
POST /auth/register
{
  "name": "John Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123",
  ...
}
```

2. Login to get a token:
```bash
POST /auth/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

3. Use the token in the Authorization header:
```
Authorization: Bearer <your-token>
```

## Seeded Users

The database comes with pre-seeded users from JSONPlaceholder. You can login with any of these users using:
- Email: (from the JSONPlaceholder data)
- Password: "password123"

## Development

To run the application in development mode:

```bash
npm run start:dev
```

To seed the database:
```bash
npm run seed
```

## Testing

```bash
# Unit tests
npm run test

# e2e tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Docker Commands

Build and start containers:
```bash
docker-compose up -d
```

Stop containers:
```bash
docker-compose down
```

View logs:
```bash
docker-compose logs -f
```

## License

This project is licensed under the MIT License. 