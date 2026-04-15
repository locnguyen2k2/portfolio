# 🚀 ABAC NestJS - Setup Guide

## 📋 Prerequisites and System Requirements

### Required Software

| Software | Minimum Version | Recommended Version | Purpose |
|----------|----------------|-------------------|---------|
| **Node.js** | 18.0.0 | 20.x LTS | JavaScript runtime |
| **npm** | 9.0.0 | 10.x | Package manager |
| **PostgreSQL** | 13.0 | 15.x or 16.x | Relational database |
| **Redis** | 6.0 | 7.x | In-memory cache |
| **Git** | 2.0 | Latest | Version control |

### Optional Software

| Software | Purpose |
|----------|---------|
| **Docker** | Containerized deployment |
| **Docker Compose** | Multi-container orchestration |
| **PM2** | Process management for production |

### Hardware Requirements

**Minimum**:
- CPU: 2 cores
- RAM: 4 GB
- Disk: 10 GB free space

**Recommended**:
- CPU: 4 cores
- RAM: 8 GB
- Disk: 20 GB free space (SSD preferred)

### Network Requirements

- PostgreSQL port: 5432
- Redis port: 6379
- Application port: 3000 (configurable)
- Outbound internet access for npm packages

## 🔧 Installation Instructions

### Step 1: Clone the Repository

```bash
git clone https://github.com/locnguyen2k2/ddd-nest-template.git
cd rbac-nestjs
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required dependencies including:
- NestJS framework and core modules
- Prisma ORM and PostgreSQL adapter
- Redis client (ioredis)
- JWT libraries (jsonwebtoken, passport-jwt)
- Validation libraries (class-validator, class-transformer)
- Other utility libraries

### Step 3: Environment Configuration

Create a `.env` file in the root directory:

```bash
# Copy example if available
cp .env.example .env
```

Or create a new `.env` file with the following variables:

```env
# Application Configuration
NODE_ENV=development
PORT=3000
HOST=localhost

# Basic Auth for Swagger
BASIC_AUTH_USERNAME=admin
BASIC_AUTH_PASSWORD=your_secure_password

# Database Configuration
PG_RBAC_DATABASE_URL=postgresql://username:password@localhost:5432/rbac_db?schema=public

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_minimum_32_characters
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=your_refresh_token_secret_key_minimum_32_characters
JWT_REFRESH_EXPIRES_IN=7d

# Redis Configuration
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_USERNAME=
REDIS_DB=0
REDIS_TIMEOUT=300
REDIS_DEFAULT_TTL=300
REDIS_KEY_PREFIX=abac-nestjs

# Ably Configuration (for real-time features)
ABLY_API_KEY=your_ably_api_key

# Optional: Throttle Configuration
THROTTLE_TTL=60
THROTTLE_LIMIT=100
```

**Important Security Notes**:
- Use strong, random secrets for JWT keys (minimum 32 characters)
- Never commit `.env` files to version control
- Use different secrets for development and production
- Rotate secrets regularly in production

### Step 4: Database Setup

#### Option A: Local PostgreSQL Installation

**Install PostgreSQL**:

- **Ubuntu/Debian**:
  ```bash
  sudo apt update
  sudo apt install postgresql postgresql-contrib
  sudo systemctl start postgresql
  sudo systemctl enable postgresql
  ```

- **macOS (Homebrew)**:
  ```bash
  brew install postgresql
  brew services start postgresql
  ```

- **Windows**: Download from https://www.postgresql.org/download/windows/

**Create Database**:

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE rbac_db;

# Create user (optional)
CREATE USER rbac_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE rbac_db TO rbac_user;

# Exit
\q
```

#### Option B: Docker PostgreSQL

```bash
docker run --name postgres-rbac \
  -e POSTGRES_DB=rbac_db \
  -e POSTGRES_USER=rbac_user \
  -e POSTGRES_PASSWORD=secure_password \
  -p 5432:5432 \
  -d postgres:16
```

Update `.env`:
```env
PG_RBAC_DATABASE_URL=postgresql://rbac_user:secure_password@localhost:5432/rbac_db?schema=public
```

### Step 5: Redis Setup

#### Option A: Local Redis Installation

**Install Redis**:

- **Ubuntu/Debian**:
  ```bash
  sudo apt update
  sudo apt install redis-server
  sudo systemctl start redis-server
  sudo systemctl enable redis-server
  ```

- **macOS (Homebrew)**:
  ```bash
  brew install redis
  brew services start redis
  ```

- **Windows**: Use WSL or Docker

#### Option B: Docker Redis

```bash
docker run --name redis-abac \
  -p 6379:6379 \
  -d redis:7
```

**Test Redis Connection**:

```bash
redis-cli ping
# Should return: PONG
```

### Step 6: Generate Prisma Client

```bash
npm run prisma:generate
```

This generates the Prisma client based on the schema in `prisma/pg-rbac/schema.prisma`.

### Step 7: Run Database Migrations

```bash
# Apply migrations to create database schema
npx prisma migrate dev --schema=prisma/pg-rbac/schema.prisma
```

This will create all required tables:
- User
- Organization
- Staff
- Project
- Member
- Department
- Role
- Feature
- Policy
- Attributes

### Step 8: Seed Database (Optional)

```bash
npm run prisma:seed
```

This populates the database with initial data for testing.

**Note**: Review `prisma/seed.ts` to understand what data is being seeded.

### Step 9: Start the Application

#### Development Mode

```bash
npm run start:dev
```

This starts the application with:
- Hot module replacement
- Auto-restart on file changes
- Debug logging enabled

The application will be available at `http://localhost:3000`

#### Production Mode

```bash
# Build the application
npm run build

# Start production server
npm run start:prod
```

#### Debug Mode

```bash
npm run start:debug
```

This starts with debugging enabled for IDE integration.

## ✅ Verification Steps

### Step 1: Check Application Health

```bash
curl http://localhost:3000
```

Expected response:
```json
{
  "message": "Welcome to ABAC NestJS API"
}
```

### Step 2: Access Swagger Documentation

1. Open browser to `http://localhost:3000/api`
2. Enter basic auth credentials:
   - Username: `BASIC_AUTH_USERNAME` from `.env`
   - Password: `BASIC_AUTH_PASSWORD` from `.env`
3. You should see the interactive API documentation

### Step 3: Test User Registration

```bash
curl -X POST http://localhost:3000/v1/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "TestPass123!",
    "first_name": "Test",
    "last_name": "User",
    "email": "test@example.com"
  }'
```

Expected response (201 Created):
```json
{
  "user": {
    "id": "...",
    "username": "testuser",
    "email": "test@example.com",
    ...
  },
  "access_token": "...",
  "refresh_token": "..."
}
```

### Step 4: Test Database Connection

Check that tables were created:

```bash
# Connect to PostgreSQL
psql -U postgres -d rbac_db

# List tables
\dt

# Should show: User, Organization, Staff, Project, Member, Department, Role, Feature, Policy, Attributes

# Exit
\q
```

### Step 5: Test Redis Connection

```bash
redis-cli
> keys *
> exit
```

Should show session/cache keys after API calls.

### Step 6: Verify Environment Configuration

Check that all environment variables are loaded:

```bash
# In the application logs, you should see configuration loaded
# No errors about missing environment variables
```

## 🔍 Troubleshooting Guide

### Common Issues and Solutions

#### Issue: Database Connection Failed

**Symptoms**:
```
Error: Can't reach database server at `localhost:5432`
```

**Solutions**:
1. Verify PostgreSQL is running:
   ```bash
   # Linux/Mac
   sudo systemctl status postgresql
   
   # Windows
   # Check PostgreSQL service in Services
   ```

2. Check connection string in `.env`:
   ```env
   PG_RBAC_DATABASE_URL=postgresql://username:password@localhost:5432/rbac_db?schema=public
   ```

3. Verify database exists:
   ```bash
   psql -U postgres -l
   ```

4. Check firewall settings (port 5432)

5. Test connection manually:
   ```bash
   psql -U postgres -d rbac_db
   ```

---

#### Issue: Redis Connection Failed

**Symptoms**:
```
Error: Redis connection to localhost:6379 failed
```

**Solutions**:
1. Verify Redis is running:
   ```bash
   # Linux/Mac
   sudo systemctl status redis-server
   
   # Or
   redis-cli ping
   ```

2. Check Redis configuration in `.env`:
   ```env
   REDIS_HOST=127.0.0.1
   REDIS_PORT=6379
   ```

3. Start Redis if not running:
   ```bash
   # Linux/Mac
   sudo systemctl start redis-server
   
   # Docker
   docker start redis-abac
   ```

4. Check if another service is using port 6379:
   ```bash
   # Linux/Mac
   lsof -i :6379
   
   # Windows
   netstat -ano | findstr :6379
   ```

---

#### Issue: Prisma Client Generation Failed

**Symptoms**:
```
Error: P3006
Migration `...` failed to apply cleanly to the shadow database.
```

**Solutions**:
1. Reset Prisma:
   ```bash
   npx prisma migrate reset --force --schema=prisma/pg-rbac/schema.prisma
   ```

2. Delete and regenerate:
   ```bash
   rm -rf node_modules/@internal
   npm run prisma:generate
   ```

3. Check schema file syntax:
   ```bash
   npx prisma validate --schema=prisma/pg-rbac/schema.prisma
   ```

4. Ensure PostgreSQL is accessible before running migrations

---

#### Issue: Port Already in Use

**Symptoms**:
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solutions**:
1. Change port in `.env`:
   ```env
   PORT=3001
   ```

2. Kill process using port 3000:
   ```bash
   # Linux/Mac
   lsof -ti:3000 | xargs kill -9
   
   # Windows
   netstat -ano | findstr :3000
   taskkill /PID <PID> /F
   ```

3. Use a different port temporarily for testing

---

#### Issue: JWT Token Errors

**Symptoms**:
```
Error: Unauthorized
Error: Invalid token
```

**Solutions**:
1. Verify JWT secrets are set in `.env`:
   ```env
   JWT_SECRET=minimum_32_characters_long_secret
   JWT_REFRESH_SECRET=minimum_32_characters_long_secret
   ```

2. Ensure secrets are at least 32 characters

3. Regenerate tokens after changing secrets

4. Check token expiration:
   ```env
   JWT_EXPIRES_IN=15m
   JWT_REFRESH_EXPIRES_IN=7d
   ```

---

#### Issue: Module Import Errors

**Symptoms**:
```
Error: Cannot find module '@/...'
```

**Solutions**:
1. Rebuild TypeScript:
   ```bash
   npm run build
   ```

2. Clear node_modules and reinstall:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. Check `tsconfig.json` path mappings:
   ```json
   {
     "compilerOptions": {
       "paths": {
         "@/*": ["src/*"]
       }
     }
   }
   ```

4. Ensure `module-alias` is configured correctly in `package.json`

---

#### Issue: ABAC Guard Always Denying Access

**Symptoms**:
```
Error: Access denied by ABAC policy
```

**Solutions**:
1. Verify policies exist in database:
   ```bash
   psql -U postgres -d rbac_db -c "SELECT * FROM \"Policy\";"
   ```

2. Check policy conditions are valid JSON Logic

3. Verify user has required attributes:
   ```bash
   psql -U postgres -d rbac_db -c "SELECT * FROM \"User\" WHERE email = 'your@email.com';"
   ```

4. Test with a simple ALLOW policy first:
   ```json
   {
     "effect": "ALLOW",
     "action": "*",
     "resource": "*",
     "condition": true
   }
   ```

5. Check tenant context headers are set correctly

---

#### Issue: Docker Container Not Starting

**Symptoms**:
```
Error: Container exited immediately
```

**Solutions**:
1. Check container logs:
   ```bash
   docker logs <container-name>
   ```

2. Verify environment variables are passed:
   ```bash
   docker run --env-file .env ...
   ```

3. Check volume mounts:
   ```bash
   docker inspect <container-name>
   ```

4. Ensure ports are not already in use

5. Test with interactive mode:
   ```bash
   docker run -it <image-name> /bin/bash
   ```

---

### Debug Mode

Enable detailed logging for troubleshooting:

```bash
# Set debug environment
NODE_ENV=development

# Start with verbose logging
npm run start:dev
```

Check logs for:
- Database connection errors
- Redis connection errors
- Missing environment variables
- Policy evaluation logs
- Request/response logs

### Log Locations

- **Application Logs**: Console output (can be redirected to file)
- **Database Logs**: PostgreSQL logs (usually in `/var/log/postgresql/`)
- **Redis Logs**: Redis logs (usually in `/var/log/redis/`)

### Getting Help

If you encounter issues not covered here:

1. **Check Documentation**:
   - Architecture Documentation: `project-docs/architecture-documentation.md`
   - API Documentation: `project-docs/api-documentation.md`

2. **Check GitHub Issues**:
   - https://github.com/locnguyen2k2/ddd-nest-template/issues

3. **Enable Debug Logging**:
   - Set `LOG_LEVEL=debug` in `.env`
   - Review detailed logs

4. **Verify Dependencies**:
   ```bash
   npm list
   npm outdated
   ```

5. **Clean Install**:
   ```bash
   rm -rf node_modules dist
   npm install
   npm run build
   ```

## 🐳 Docker Setup (Optional)

### Using Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:16
    container_name: postgres-rbac
    environment:
      POSTGRES_DB: rbac_db
      POSTGRES_USER: rbac_user
      POSTGRES_PASSWORD: secure_password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U rbac_user"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7
    container_name: redis-abac
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

  app:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: abac-nestjs
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: production
      PG_RBAC_DATABASE_URL: postgresql://rbac_user:secure_password@postgres:5432/rbac_db?schema=public
      REDIS_HOST: redis
      REDIS_PORT: 6379
      JWT_SECRET: your_jwt_secret_key_minimum_32_characters
      JWT_REFRESH_SECRET: your_refresh_token_secret_key_minimum_32_characters
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    command: npm run start:prod

volumes:
  postgres_data:
  redis_data:
```

Create `Dockerfile`:

```dockerfile
# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/@internal ./node_modules/@internal

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
```

**Start with Docker Compose**:

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Stop with volumes
docker-compose down -v
```

## 🚀 Production Deployment

### PM2 Setup

**Install PM2**:

```bash
npm install -g pm2
```

**Create Ecosystem File** (`ecosystem.config.js`):

```javascript
module.exports = {
  apps: [{
    name: 'abac-nestjs',
    script: './dist/src/main.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss',
    merge_logs: true,
    autorestart: true,
    max_restarts: 10,
    min_uptime: '10s',
  }],
};
```

**Start with PM2**:

```bash
# Build application
npm run build

# Start with PM2
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Setup PM2 to start on system boot
pm2 startup
```

**PM2 Commands**:

```bash
pm2 list              # List all processes
pm2 logs abac-nestjs  # View logs
pm2 restart abac-nestjs  # Restart
pm2 stop abac-nestjs     # Stop
pm2 delete abac-nestjs   # Remove
pm2 monit               # Monitor
```

### Environment Variables for Production

Create `.env.production`:

```env
NODE_ENV=production
PORT=3000
HOST=0.0.0.0

# Use strong, randomly generated secrets
JWT_SECRET=<generate-secure-random-64-char-string>
JWT_REFRESH_SECRET=<generate-secure-random-64-char-string>
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Production database
PG_RBAC_DATABASE_URL=postgresql://user:password@production-db-host:5432/rbac_db?schema=public

# Production Redis
REDIS_HOST=production-redis-host
REDIS_PORT=6379
REDIS_PASSWORD=<secure-redis-password>

# Basic Auth for Swagger (consider disabling in production)
BASIC_AUTH_USERNAME=<secure-username>
BASIC_AUTH_PASSWORD=<secure-password>

# Ably for production
ABLY_API_KEY=<production-ably-key>
```

**Generate Secure Secrets**:

```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Using OpenSSL
openssl rand -base64 64
```

### Nginx Reverse Proxy (Optional)

Create Nginx configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**SSL Configuration with Let's Encrypt**:

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal is configured automatically
```

### Database Backup

**Automated Backup Script** (`backup.sh`):

```bash
#!/bin/bash

# Configuration
DB_HOST="localhost"
DB_PORT="5432"
DB_NAME="rbac_db"
DB_USER="rbac_user"
BACKUP_DIR="/backups"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/rbac_db_$DATE.sql"

# Create backup directory
mkdir -p $BACKUP_DIR

# Perform backup
PGPASSWORD=$DB_PASSWORD pg_dump -h $DB_HOST -p $DB_PORT -U $DB_USER $DB_NAME > $BACKUP_FILE

# Compress backup
gzip $BACKUP_FILE

# Remove backups older than 30 days
find $BACKUP_DIR -name "rbac_db_*.sql.gz" -mtime +30 -delete

echo "Backup completed: $BACKUP_FILE.gz"
```

**Add to Cron**:

```bash
# Edit crontab
crontab -e

# Add daily backup at 2 AM
0 2 * * * /path/to/backup.sh
```

### Monitoring Setup

**Install Monitoring Tools**:

```bash
# PM2 Plus (cloud monitoring)
pm2 plus

# Or local monitoring
npm install -g pm2-logrotate
pm2 install pm2-logrotate
```

**Health Check Endpoint**:

Add to `main.ts`:

```typescript
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});
```

## 📝 Post-Setup Checklist

- [ ] Application starts without errors
- [ ] Database connection successful
- [ ] Redis connection successful
- [ ] Swagger documentation accessible
- [ ] User registration works
- [ ] User login works
- [ ] JWT token generation works
- [ ] Token refresh works
- [ ] ABAC policies can be created
- [ ] ABAC authorization works
- [ ] Environment variables are secured
- [ ] Database backup configured
- [ ] Monitoring configured
- [ ] SSL/TLS configured (production)
- [ ] Firewall rules configured
- [ ] Log rotation configured

---

**ABAC NestJS Setup Guide**

Generated on: 2026-04-14
Version: 0.0.1
