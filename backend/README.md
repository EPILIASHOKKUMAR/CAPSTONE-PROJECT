# 🔧 Backend - Civic Issue Reporter API

RESTful API built with Node.js, Express.js, and MongoDB for managing civic issue reports.

## 🌐 Live API

**Base URL**: [https://capstone-project-1-erp4.onrender.com/api](https://capstone-project-1-erp4.onrender.com/api)

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Environment Setup

Create a `.env` file in the backend directory:

```env
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/civic-reporter
JWT_SECRET=your_jwt_secret_key
JWT_REFRESH_SECRET=your_refresh_secret_key
JWT_EXPIRE=24h
JWT_REFRESH_EXPIRE=7d
GEMINI_API_KEY=your_gemini_api_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
SESSION_SECRET=your_session_secret
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/webp
```

### Database Setup

```bash
node setup-mongodb.js
node setup-default-admin.js
```

### Run Development Server

```bash
npm start
```

Server will run on `http://localhost:5000`

## 📚 API Endpoints

### Authentication

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "phone": "+1234567890"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "user": {
      "id": "user_id",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "role": "user"
    },
    "accessToken": "jwt_token",
    "refreshToken": "refresh_token"
  }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

#### Admin Login
```http
POST /api/auth/admin/login
Content-Type: application/json

{
  "email": "admin@civic.com",
  "password": "admin123"
}
```

#### Google OAuth
```http
GET /api/auth/google
```

Redirects to Google OAuth consent screen.

#### Google OAuth Callback
```http
GET /api/auth/google/callback
```

Handles OAuth callback and redirects to frontend with tokens.

#### Refresh Token
```http
POST /api/auth/refresh-token
Content-Type: application/json

{
  "refreshToken": "your_refresh_token"
}
```

#### Get Profile
```http
GET /api/auth/profile
Authorization: Bearer {access_token}
```

#### Update Profile
```http
PUT /api/auth/profile
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890"
}
```

#### Logout
```http
POST /api/auth/logout
Authorization: Bearer {access_token}
```

### Issues

#### Create Issue
```http
POST /api/issues
Authorization: Bearer {access_token}
Content-Type: multipart/form-data

title: Broken streetlight
description: Streetlight not working on Main St
category: Infrastructure
location[type]: Point
location[coordinates][0]: -73.935242
location[coordinates][1]: 40.730610
address: 123 Main St, New York, NY
image: [file]
```

**Response:**
```json
{
  "success": true,
  "message": "Issue reported successfully",
  "data": {
    "issue": {
      "id": "issue_id",
      "title": "Broken streetlight",
      "description": "Streetlight not working on Main St",
      "category": "Infrastructure",
      "status": "Pending",
      "location": {
        "type": "Point",
        "coordinates": [-73.935242, 40.730610]
      },
      "imageUrl": "https://example.com/image.jpg",
      "aiDescription": "AI-generated description",
      "createdAt": "2024-02-24T10:00:00.000Z"
    }
  }
}
```

#### Get All Issues (Admin)
```http
GET /api/issues
Authorization: Bearer {admin_access_token}
```

Query parameters:
- `status`: Filter by status (Pending, In Progress, Resolved, Rejected)
- `category`: Filter by category
- `startDate`: Filter from date
- `endDate`: Filter to date
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)

#### Get User Issues
```http
GET /api/issues/user
Authorization: Bearer {access_token}
```

#### Get Issue by ID
```http
GET /api/issues/:id
Authorization: Bearer {access_token}
```

#### Update Issue (Admin)
```http
PUT /api/issues/:id
Authorization: Bearer {admin_access_token}
Content-Type: application/json

{
  "status": "In Progress",
  "adminNotes": "Working on fixing the streetlight"
}
```

#### Delete Issue (Admin)
```http
DELETE /api/issues/:id
Authorization: Bearer {admin_access_token}
```

### AI Analysis

#### Analyze Image
```http
POST /api/ai/analyze-image
Authorization: Bearer {access_token}
Content-Type: multipart/form-data

image: [file]
```

**Response:**
```json
{
  "success": true,
  "data": {
    "description": "AI-generated description of the image",
    "suggestedCategory": "Infrastructure",
    "severity": "Medium"
  }
}
```

### Health Check

```http
GET /api/health
```

**Response:**
```json
{
  "status": "OK",
  "message": "Civic Reporter API is running",
  "timestamp": "2024-02-24T10:00:00.000Z",
  "environment": "production"
}
```

## 🗄️ Database Models

### User Model
```javascript
{
  firstName: String,
  lastName: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  role: String (user/admin),
  googleId: String,
  isEmailVerified: Boolean,
  profileImage: {
    url: String,
    publicId: String
  },
  refreshTokens: [{
    token: String,
    expiresAt: Date,
    userAgent: String,
    ipAddress: String
  }],
  createdAt: Date,
  updatedAt: Date
}
```

### Issue Model
```javascript
{
  title: String,
  description: String,
  category: String,
  status: String (Pending/In Progress/Resolved/Rejected),
  location: {
    type: String,
    coordinates: [Number]
  },
  address: String,
  imageUrl: String,
  imagePublicId: String,
  aiDescription: String,
  userId: ObjectId (ref: User),
  adminNotes: String,
  resolvedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔒 Authentication & Authorization

### JWT Token Structure
```json
{
  "userId": "user_id",
  "role": "user",
  "iat": 1234567890,
  "exp": 1234567890
}
```

### Role-Based Access Control
- **User**: Can create issues, view own issues, update profile
- **Admin**: Can view all issues, update issue status, add notes, delete issues

## 📧 Email Notifications

Automated emails are sent for:

1. **Issue Submission**
   - Sent to: User who reported the issue
   - Contains: Issue details, tracking number, submission confirmation

2. **Status Update**
   - Sent to: User who reported the issue
   - Contains: New status, admin notes, updated timestamp

3. **Issue Resolution**
   - Sent to: User who reported the issue
   - Contains: Resolution details, admin notes, thank you message

## 🤖 AI Integration

### Google Gemini API
- Analyzes uploaded images
- Generates detailed descriptions
- Suggests issue categories
- Estimates severity levels

## 🛡️ Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Authentication**: Access + Refresh token mechanism
- **Rate Limiting**: Prevents brute force attacks
- **Input Validation**: Express Validator
- **CORS**: Configured for frontend origin
- **Helmet**: Security headers
- **File Upload Restrictions**: Size and type validation

## 📊 Error Handling

All errors follow this format:
```json
{
  "success": false,
  "message": "Error message",
  "errors": ["Detailed error 1", "Detailed error 2"]
}
```

### HTTP Status Codes
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `429`: Too Many Requests
- `500`: Internal Server Error

## 🧪 Testing

### Test Health Endpoint
```bash
curl http://localhost:5000/api/health
```

### Test Registration
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "password": "Test1234!",
    "phone": "+1234567890"
  }'
```

### Test Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test1234!"
  }'
```

## 🚀 Deployment (Render)

1. Create new Web Service
2. Connect GitHub repository
3. Set root directory: `backend`
4. Build command: `npm install`
5. Start command: `node server.js`
6. Add environment variables
7. Deploy

### Environment Variables for Production
```env
NODE_ENV=production
PORT=10000
FRONTEND_URL=https://your-frontend-url.vercel.app
MONGODB_URI=your_production_mongodb_uri
GOOGLE_CALLBACK_URL=https://your-backend-url.onrender.com/api/auth/google/callback
```

## 📦 Dependencies

### Core
- express: Web framework
- mongoose: MongoDB ODM
- dotenv: Environment variables

### Authentication
- jsonwebtoken: JWT tokens
- bcryptjs: Password hashing
- passport: Authentication middleware
- passport-google-oauth20: Google OAuth

### Security
- helmet: Security headers
- cors: Cross-origin resource sharing
- express-rate-limit: Rate limiting
- express-validator: Input validation

### File Upload
- multer: File upload handling

### Email
- nodemailer: Email sending

### AI
- @google/generative-ai: Gemini API

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Check MONGODB_URI format
- Verify network access in MongoDB Atlas
- Whitelist IP address: 0.0.0.0/0

### Email Not Sending
- Enable 2FA on Gmail
- Generate App Password
- Use App Password in EMAIL_PASS

### Google OAuth Not Working
- Verify redirect URIs in Google Console
- Check GOOGLE_CALLBACK_URL matches
- Ensure credentials are correct

## 📞 Support

For issues, contact: eppiliashokkumara@gmail.com

---

Built with Node.js and Express.js
