# 🏙️ Civic Issue Reporter

A comprehensive full-stack web application for reporting and managing civic issues with AI-powered image analysis, real-time geolocation, email notifications, and Google OAuth authentication.

## � Live Demo

- **Frontend**: [https://capstone-project-three-brown.vercel.app](https://capstone-project-three-brown.vercel.app)
- **Backend API**: [https://capstone-project-1-erp4.onrender.com](https://capstone-project-1-erp4.onrender.com)

## 🎯 Features

### User Features
- 📝 Report civic issues with image upload
- 📍 Automatic geolocation capture
- 🤖 AI-powered image description using Google Gemini
- 📧 Email notifications on issue submission and updates
- 🗺️ Interactive map view of all issues
- � Personal dashboard to track reported issues
- 🔐 Secure authentication with JWT and Google OAuth
- 📱 Fully responsive mobile-friendly design

### Admin Features
- 👥 Manage all reported issues
- ✏️ Update issue status (Pending, In Progress, Resolved, Rejected)
- 📝 Add notes to issues
- 📧 Automatic email notifications to users on updates
- 🗺️ Map view with filtering and routing options
- 📈 Weekly report generation
- 🔍 Advanced filtering and search capabilities

## 🏗️ Tech Stack

### Frontend
- **Framework**: React.js 18
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **Maps**: Leaflet.js with OpenStreetMap
- **State Management**: React Context API
- **Form Handling**: React Hook Form
- **HTTP Client**: Axios
- **Routing**: React Router v6

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB Atlas
- **Authentication**: JWT + Passport.js (Google OAuth)
- **AI Service**: Google Gemini API
- **Email Service**: Nodemailer with Gmail SMTP
- **File Upload**: Multer
- **Security**: Helmet, CORS, Rate Limiting
- **Validation**: Express Validator

## 📁 Project Structure

```
capstone-project/
├── backend/
│   ├── config/              # Configuration files
│   │   └── passport.js      # Google OAuth configuration
│   ├── controllers/         # Route controllers
│   │   ├── authController.js
│   │   ├── issueController.js
│   │   ├── userController.js
│   │   └── aiController.js
│   ├── middleware/          # Custom middleware
│   │   ├── auth.js          # JWT authentication
│   │   ├── validation.js    # Input validation
│   │   ├── upload.js        # File upload handling
│   │   └── errorHandler.js
│   ├── models/              # MongoDB models
│   │   ├── User.js
│   │   └── Issue.js
│   ├── routes/              # API routes
│   │   ├── auth.js
│   │   ├── issues.js
│   │   ├── users.js
│   │   └── ai.js
│   ├── utils/               # Utility functions
│   │   ├── jwt.js           # JWT token generation
│   │   ├── emailService.js  # Email notifications
│   │   ├── aiService.js     # AI image analysis
│   │   └── geocoding.js     # Location services
│   ├── uploads/             # Uploaded images
│   ├── .env                 # Environment variables
│   ├── server.js            # Entry point
│   └── package.json
│
└── frontend/
    ├── public/
    │   ├── index.html
    │   └── favicon.png
    ├── src/
    │   ├── components/      # Reusable components
    │   │   ├── Admin/
    │   │   ├── Auth/
    │   │   ├── Layout/
    │   │   ├── Map/
    │   │   └── UI/
    │   ├── contexts/        # React contexts
    │   │   ├── AuthContext.js
    │   │   └── ThemeContext.js
    │   ├── hooks/           # Custom hooks
    │   │   └── useGeolocation.js
    │   ├── pages/           # Page components
    │   │   ├── Admin/
    │   │   ├── Auth/
    │   │   └── User/
    │   ├── services/        # API services
    │   ├── utils/           # Helper functions
    │   ├── App.js
    │   ├── index.js
    │   └── index.css
    ├── .env                 # Environment variables
    ├── .env.production      # Production environment
    └── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- Google Cloud Console account (for OAuth and Gemini API)
- Gmail account (for email notifications)

### Backend Setup

1. **Clone the repository**
```bash
git clone https://github.com/EPILIASHOKKUMAR/CAPSTONE-PROJECT.git
cd CAPSTONE-PROJECT/backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create .env file**
```env
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
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
EMAIL_PASS=your_app_password
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/webp
```

4. **Setup MongoDB and create admin account**
```bash
node setup-mongodb.js
node setup-default-admin.js
```

5. **Start the server**
```bash
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd ../frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create .env file**
```env
PORT=3000
REACT_APP_API_URL=http://localhost:5000/api
GENERATE_SOURCEMAP=TRUE
```

4. **Start the development server**
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## 🔐 Default Admin Credentials

- **Email**: admin@civic.com
- **Password**: admin123

## 📧 Email Notifications

The system sends automated emails for:
- Issue submission confirmation
- Status updates (Pending → In Progress → Resolved)
- Admin notes added to issues

## 🤖 AI Integration

Uses Google Gemini API to automatically:
- Analyze uploaded images
- Generate detailed descriptions
- Identify issue types and severity

## 🗺️ Map Features

- Interactive map with issue markers
- Color-coded by status (Pending, In Progress, Resolved)
- Click markers to view issue details
- Routing options for admins
- Filter by status, category, and date range

## 🔒 Security Features

- JWT-based authentication with refresh tokens
- Password hashing with bcrypt
- Rate limiting on sensitive endpoints
- Input validation and sanitization
- CORS configuration
- Helmet.js security headers
- File upload restrictions

## 🌐 API Documentation

### Authentication Endpoints

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

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

#### Google OAuth
```http
GET /api/auth/google
```

### Issue Endpoints

#### Create Issue
```http
POST /api/issues
Authorization: Bearer {token}
Content-Type: multipart/form-data

{
  "title": "Broken streetlight",
  "description": "Streetlight not working",
  "category": "Infrastructure",
  "location": {
    "type": "Point",
    "coordinates": [longitude, latitude]
  },
  "image": [file]
}
```

#### Get All Issues
```http
GET /api/issues
Authorization: Bearer {token}
```

#### Update Issue Status
```http
PUT /api/issues/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "In Progress",
  "adminNotes": "Working on it"
}
```

## 🚀 Deployment

### Backend (Render)

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set build command: `npm install`
4. Set start command: `node server.js`
5. Add environment variables from `.env`
6. Deploy

### Frontend (Vercel)

1. Import project from GitHub
2. Set root directory to `frontend`
3. Add environment variable: `REACT_APP_API_URL`
4. Deploy

### MongoDB Atlas

1. Create a cluster
2. Add database user
3. Whitelist IP: `0.0.0.0/0` (for Render)
4. Get connection string

### Google OAuth Setup

1. Go to Google Cloud Console
2. Create OAuth 2.0 credentials
3. Add authorized origins and redirect URIs
4. Copy Client ID and Secret

## 🧪 Testing

### Test User Registration
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

## 📝 License

This project is licensed under the MIT License.

## 👥 Contributors

- **Eppili Ashok Kumar** - Full Stack Developer

## 🙏 Acknowledgments

- Google Gemini API for AI capabilities
- OpenStreetMap for map tiles
- MongoDB Atlas for database hosting
- Render and Vercel for deployment

## 📞 Support

For issues and questions, please open an issue on GitHub or contact: eppiliashokkumara@gmail.com

---

Made with ❤️ for better civic engagement
