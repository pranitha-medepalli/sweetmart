# SweetMart Backend API

A robust, production-ready RESTful API backend for the Sweet Shop Management System built with Node.js, Express, and MongoDB. This backend follows Test-Driven Development (TDD), SOLID principles, and clean coding practices.

## 🚀 Features

- **JWT Authentication** - Secure user registration and login
- **Role-Based Access Control** - Admin and user roles with protected routes
- **RESTful API** - Clean, consistent API design
- **Input Validation** - Comprehensive validation using express-validator
- **Error Handling** - Centralized error handling middleware
- **Security** - Helmet, CORS, rate limiting, and password hashing
- **Testing** - Comprehensive unit and integration tests
- **Database** - MongoDB with Mongoose ODM
- **Documentation** - Well-documented code and API endpoints

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

## 🛠️ Installation

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```

4. **Configure `.env` file:**
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/sweetmart
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRE=7d
   CORS_ORIGIN=http://localhost:3000
   ```

5. **Start MongoDB:**
   - Local: Ensure MongoDB is running on your system
   - Atlas: Use your MongoDB Atlas connection string in `MONGODB_URI`

6. **Run the server:**
   ```bash
   # Development mode with auto-reload
   npm run dev

   # Production mode
   npm start
   ```

## 🧪 Testing

The project follows Test-Driven Development (TDD) with comprehensive test coverage.

### Run all tests:
```bash
npm test
```

### Run tests in watch mode:
```bash
npm run test:watch
```

### Run tests with coverage:
```bash
npm run test:coverage
```

### Test Structure:
- **Unit Tests**: `__tests__/unit/` - Test individual functions and models
- **Integration Tests**: `__tests__/integration/` - Test API endpoints

## 📁 Project Structure

```
backend/
├── __tests__/              # Test files
│   ├── unit/              # Unit tests
│   ├── integration/       # Integration tests
│   └── setup.test.js      # Test setup
├── config/                # Configuration files
│   └── database.js        # Database connection
├── controllers/           # Route controllers
│   ├── auth.controller.js
│   └── sweet.controller.js
├── middleware/            # Custom middleware
│   ├── auth.middleware.js
│   ├── errorHandler.middleware.js
│   ├── notFound.middleware.js
│   └── validation.middleware.js
├── models/                # Mongoose models
│   ├── User.model.js
│   └── Sweet.model.js
├── routes/                # API routes
│   ├── auth.routes.js
│   └── sweet.routes.js
├── utils/                 # Utility functions
│   └── jwt.util.js
├── validators/            # Input validators
│   ├── auth.validator.js
│   └── sweet.validator.js
├── server.js              # Application entry point
├── package.json
└── README.md
```

## 🔌 API Endpoints

### Authentication

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### Sweets

#### Get All Sweets (with optional filters)
```http
GET /api/sweets?name=kaju&category=Kaju Katli&minPrice=400&maxPrice=500
```

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "sweet_id",
      "name": "Kaju Katli",
      "category": "Kaju Katli",
      "price": 450.00,
      "quantity": 50,
      "image": "https://example.com/image.jpg",
      "description": "Delicious cashew-based sweet"
    }
  ]
}
```

#### Get Sweet by ID
```http
GET /api/sweets/:id
```

#### Create Sweet (Admin Only)
```http
POST /api/sweets
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "Gulab Jamun",
  "category": "Gulab Jamun",
  "price": 300.00,
  "quantity": 40,
  "image": "https://example.com/gulab-jamun.jpg",
  "description": "Soft, syrupy sweet"
}
```

#### Update Sweet (Admin Only)
```http
PUT /api/sweets/:id
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "price": 350.00,
  "quantity": 45
}
```

#### Delete Sweet (Admin Only)
```http
DELETE /api/sweets/:id
Authorization: Bearer <admin_token>
```

#### Purchase Sweet
```http
POST /api/sweets/:id/purchase
Authorization: Bearer <user_token>
Content-Type: application/json

{
  "quantity": 5
}
```

#### Restock Sweet (Admin Only)
```http
POST /api/sweets/:id/restock
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "quantity": 20
}
```

## 🔒 Security Features

- **Password Hashing** - Bcrypt with salt rounds
- **JWT Tokens** - Secure token-based authentication
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing configuration
- **Rate Limiting** - Protection against brute force attacks
- **Input Validation** - Prevents injection attacks
- **Error Handling** - No sensitive information leakage

## 🎯 Role-Based Access Control

- **User Role**: Can view sweets and make purchases
- **Admin Role**: Full CRUD access to sweets, can restock inventory

## 📝 Code Quality

- **SOLID Principles** - Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion
- **Clean Code** - Readable, maintainable, and well-documented
- **Error Handling** - Comprehensive error handling with meaningful messages
- **Validation** - Input validation at multiple layers
- **Testing** - High test coverage with unit and integration tests

## 🧩 Dependencies

### Production
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `jsonwebtoken` - JWT implementation
- `bcryptjs` - Password hashing
- `express-validator` - Input validation
- `dotenv` - Environment variables
- `cors` - CORS middleware
- `helmet` - Security headers
- `express-rate-limit` - Rate limiting
- `morgan` - HTTP request logger

### Development
- `jest` - Testing framework
- `supertest` - HTTP assertion library
- `nodemon` - Development auto-reload

## 🚨 Error Responses

All errors follow a consistent format:

```json
{
  "success": false,
  "message": "Error message here"
}
```

**Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## 🔧 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment (development/production/test) | `development` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/sweetmart` |
| `JWT_SECRET` | Secret key for JWT tokens | Required |
| `JWT_EXPIRE` | JWT token expiration | `7d` |
| `CORS_ORIGIN` | Allowed CORS origin | `http://localhost:3000` |

## 📊 Testing Coverage

Run `npm run test:coverage` to see test coverage report. The project aims for:
- **Unit Tests**: >80% coverage
- **Integration Tests**: All API endpoints covered

## 🤝 Contributing

1. Follow TDD approach - Write tests first
2. Follow SOLID principles
3. Write clean, readable code
4. Add proper error handling
5. Update documentation

## 📄 License

This project is open source and available for educational and commercial use.

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env`
- Verify network connectivity for MongoDB Atlas

### JWT Token Issues
- Ensure `JWT_SECRET` is set in `.env`
- Check token expiration
- Verify token format in Authorization header

### Port Already in Use
- Change `PORT` in `.env`
- Kill process using the port: `lsof -ti:5000 | xargs kill`

---

**Built with ❤️ following best practices and TDD principles**

