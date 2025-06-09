# Installation Guide

## Prerequisites

Before installing the JSONPlaceholder API, ensure you have the following installed:

- Node.js (v18.0.0 or higher)
- npm (v8.0.0 or higher)
- Git

## Installation Steps

1. **Clone the Repository**

```bash
git clone https://github.com/yourusername/jsonplaceholder-api.git
cd jsonplaceholder-api
```

2. **Install Dependencies**

```bash
npm install
```

3. **Environment Setup**

Create a `.env` file in the root directory and copy the contents from `.env.example`:

```bash
cp .env.example .env
```

Update the environment variables as needed:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# JWT Configuration
JWT_SECRET=your-secret-key
JWT_EXPIRATION=1h
```

4. **Database Setup**

```bash
# Run database migrations
npm run migration:run

# (Optional) Seed the database with sample data
npm run seed
```

5. **Build the Application**

```bash
npm run build
```

## Running the Application

### Development Mode

```bash
# Watch mode
npm run start:dev

# Debug mode
npm run start:debug
```

### Production Mode

```bash
npm run start:prod
```

## Verification

To verify the installation:

1. The server should be running on `http://localhost:3000`
2. Access the Swagger documentation at `http://localhost:3000/api`
3. Run the health check endpoint:

```bash
curl http://localhost:3000/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2024-01-23T10:00:00.000Z"
}
```

## Common Issues

### Port Already in Use

If port 3000 is already in use, you can:
- Change the PORT in your `.env` file
- Or terminate the process using that port:
  ```bash
  lsof -i :3000
  kill -9 <PID>
  ```

### Database Connection Issues

1. Ensure PostgreSQL is running
2. Verify database credentials in `.env`
3. Check database exists:
   ```bash
   psql -l | grep dbname
   ```

## Next Steps

- Read the [Quick Start Guide](./quick-start.md) for basic usage
- Review the [Configuration Guide](./configuration.md) for detailed settings
- Check the [API Documentation](../api/README.md) for available endpoints

## Support

If you encounter any issues during installation:

1. Check the [Troubleshooting Guide](../troubleshooting.md)
2. Search existing GitHub issues
3. Create a new issue with:
   - Node.js version (`node -v`)
   - npm version (`npm -v`)
   - Error message and stack trace
   - Steps to reproduce 