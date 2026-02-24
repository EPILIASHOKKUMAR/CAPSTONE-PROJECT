# 📋 Project Information - Civic Issue Reporter

## 🎓 Project Details

**Project Name**: Civic Issue Reporter  
**Type**: Full Stack Web Application  
**Category**: Civic Engagement & Smart City Solution  
**Developer**: Eppili Ashok Kumar  
**Email**: eppiliashokkumara@gmail.com  
**Repository**: [https://github.com/EPILIASHOKKUMAR/CAPSTONE-PROJECT](https://github.com/EPILIASHOKKUMAR/CAPSTONE-PROJECT)

## 🌐 Live Application

**Frontend**: [https://capstone-project-three-brown.vercel.app](https://capstone-project-three-brown.vercel.app)  
**Backend API**: [https://capstone-project-1-erp4.onrender.com](https://capstone-project-1-erp4.onrender.com)  
**API Health Check**: [https://capstone-project-1-erp4.onrender.com/api/health](https://capstone-project-1-erp4.onrender.com/api/health)

## 🎯 Project Overview

Civic Issue Reporter is a comprehensive web application designed to bridge the gap between citizens and local authorities by providing a platform for reporting and managing civic issues. The application leverages modern web technologies, AI-powered image analysis, and real-time notifications to create an efficient civic engagement ecosystem.

### Problem Statement

Citizens often face challenges in reporting civic issues such as:
- Broken infrastructure
- Sanitation problems
- Street lighting issues
- Road damage
- Public safety concerns

Traditional methods of reporting these issues are often:
- Time-consuming
- Inefficient
- Lack transparency
- No tracking mechanism
- Poor communication

### Solution

Our application provides:
- **Easy Reporting**: Simple interface to report issues with photos
- **AI Analysis**: Automatic image description using Google Gemini
- **Location Tracking**: GPS-based issue location capture
- **Real-time Updates**: Email notifications on status changes
- **Transparency**: Track issue status from submission to resolution
- **Admin Dashboard**: Efficient issue management for authorities
- **Map Visualization**: Interactive map showing all reported issues

## 🏗️ Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                             │
│                    (React + Vercel)                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │   User   │  │  Admin   │  │   Map    │  │   Auth   │   │
│  │Dashboard │  │Dashboard │  │   View   │  │  Pages   │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTPS/REST API
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                         Backend                              │
│                   (Node.js + Render)                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │   Auth   │  │  Issues  │  │   AI     │  │  Email   │   │
│  │  Service │  │  Service │  │ Service  │  │ Service  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                ┌───────────┼───────────┐
                │           │           │
                ▼           ▼           ▼
         ┌──────────┐ ┌──────────┐ ┌──────────┐
         │ MongoDB  │ │  Gemini  │ │  Gmail   │
         │  Atlas   │ │   API    │ │   SMTP   │
         └──────────┘ └──────────┘ └──────────┘
```

### Technology Stack

#### Frontend
- **React 18**: Modern UI library with hooks
- **TailwindCSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **Leaflet.js**: Interactive maps
- **React Router v6**: Client-side routing
- **React Hook Form**: Form validation
- **Axios**: HTTP client
- **Lucide React**: Icon library

#### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: ODM for MongoDB
- **JWT**: Authentication tokens
- **Passport.js**: OAuth middleware
- **Multer**: File upload handling
- **Nodemailer**: Email service
- **Bcrypt**: Password hashing

#### External Services
- **MongoDB Atlas**: Cloud database
- **Google Gemini API**: AI image analysis
- **Google OAuth**: Social authentication
- **Gmail SMTP**: Email notifications
- **Vercel**: Frontend hosting
- **Render**: Backend hosting

## 📊 Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  firstName: String,
  lastName: String,
  email: String (unique, indexed),
  password: String (hashed),
  phone: String,
  role: String (enum: ['user', 'admin']),
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

### Issue Collection
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  category: String (enum: ['Infrastructure', 'Sanitation', 'Safety', 'Other']),
  status: String (enum: ['Pending', 'In Progress', 'Resolved', 'Rejected']),
  location: {
    type: String (default: 'Point'),
    coordinates: [Number] (longitude, latitude)
  },
  address: String,
  imageUrl: String,
  imagePublicId: String,
  aiDescription: String,
  userId: ObjectId (ref: 'User'),
  adminNotes: String,
  resolvedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔐 Authentication Flow

### User Registration
1. User submits registration form
2. Backend validates input
3. Password is hashed with bcrypt
4. User document created in MongoDB
5. JWT tokens generated (access + refresh)
6. Welcome email sent
7. Tokens returned to frontend
8. User redirected to dashboard

### Google OAuth Flow
1. User clicks "Sign in with Google"
2. Redirected to Google consent screen
3. User authorizes application
4. Google redirects to backend callback
5. Backend receives user profile
6. Check if user exists in database
7. Create new user or update existing
8. Generate JWT tokens
9. Redirect to frontend with tokens
10. Frontend stores tokens and redirects to dashboard

### JWT Token Management
- **Access Token**: Short-lived (24 hours)
- **Refresh Token**: Long-lived (7 days)
- **Token Refresh**: Automatic refresh before expiry
- **Token Revocation**: Logout invalidates tokens

## 📧 Email Notification System

### Email Templates

#### 1. Issue Submission Confirmation
**Trigger**: User reports new issue  
**Recipient**: User who reported  
**Content**:
- Issue title and description
- Tracking number
- Location details
- Submission timestamp
- Expected response time

#### 2. Status Update Notification
**Trigger**: Admin changes issue status  
**Recipient**: User who reported  
**Content**:
- Issue title
- Old status → New status
- Admin notes
- Update timestamp
- Next steps

#### 3. Issue Resolution
**Trigger**: Admin marks issue as resolved  
**Recipient**: User who reported  
**Content**:
- Issue title
- Resolution details
- Admin notes
- Resolution timestamp
- Thank you message

## 🤖 AI Integration

### Google Gemini API

**Purpose**: Automatic image analysis and description generation

**Process**:
1. User uploads image
2. Image sent to Gemini API
3. AI analyzes image content
4. Generates detailed description
5. Identifies issue type
6. Estimates severity
7. Returns structured data
8. Stored with issue record

**Benefits**:
- Automatic documentation
- Consistent descriptions
- Better categorization
- Improved searchability
- Enhanced admin efficiency

## 🗺️ Map Features

### Interactive Map
- **Base Layer**: OpenStreetMap tiles
- **Markers**: Color-coded by status
  - 🔴 Red: Pending
  - 🟡 Yellow: In Progress
  - 🟢 Green: Resolved
  - ⚫ Gray: Rejected
- **Popups**: Issue details on marker click
- **Clustering**: Groups nearby markers
- **Filtering**: Filter by status, category, date
- **Routing**: Admin can plan routes to issues

### Geolocation
- **Automatic**: Captures user location on report
- **Manual**: User can adjust marker position
- **Reverse Geocoding**: Converts coordinates to address
- **Accuracy**: Uses HTML5 Geolocation API

## 🔒 Security Features

### Authentication & Authorization
- JWT-based authentication
- Role-based access control (RBAC)
- Refresh token rotation
- Token blacklisting on logout
- Password strength validation
- Bcrypt password hashing (10 rounds)

### API Security
- CORS configuration
- Helmet.js security headers
- Rate limiting (100 requests/15 minutes)
- Auth rate limiting (5 attempts/minute)
- Input validation and sanitization
- SQL injection prevention
- XSS protection

### File Upload Security
- File type validation (JPEG, PNG, WebP only)
- File size limit (5MB)
- Filename sanitization
- Virus scanning (recommended for production)

### Data Protection
- Environment variables for secrets
- No sensitive data in logs
- HTTPS enforcement in production
- Secure cookie settings
- MongoDB connection encryption

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Mobile Features
- Touch-friendly interface
- Optimized images
- Simplified navigation
- Bottom navigation bar
- Swipe gestures
- Mobile-first design approach

## 🎨 UI/UX Features

### Design Principles
- **Simplicity**: Clean, intuitive interface
- **Consistency**: Uniform design language
- **Accessibility**: WCAG 2.1 compliant
- **Responsiveness**: Works on all devices
- **Performance**: Fast load times

### Animations
- Page transitions
- Button hover effects
- Loading states
- Success/error feedback
- Smooth scrolling
- Skeleton loaders

### Theme Support
- Light mode (default)
- Dark mode
- System preference detection
- Persistent theme selection

## 📈 Performance Optimization

### Frontend
- Code splitting
- Lazy loading routes
- Image optimization
- Caching strategies
- Minification
- Tree shaking
- Bundle size optimization

### Backend
- Database indexing
- Query optimization
- Response compression
- Caching (Redis recommended)
- Connection pooling
- Rate limiting

## 🧪 Testing Strategy

### Unit Tests
- Component testing
- Service testing
- Utility function testing
- API endpoint testing

### Integration Tests
- Authentication flow
- Issue creation flow
- Email notification flow
- OAuth flow

### End-to-End Tests
- User registration and login
- Issue reporting
- Admin dashboard
- Status updates

## 📊 Analytics & Monitoring

### Metrics to Track
- User registrations
- Issues reported
- Issues resolved
- Average resolution time
- User engagement
- API response times
- Error rates
- Email delivery rates

### Monitoring Tools
- Render metrics (backend)
- Vercel analytics (frontend)
- MongoDB Atlas monitoring
- Custom logging

## 🚀 Future Enhancements

### Phase 2 Features
- [ ] Mobile app (React Native)
- [ ] Push notifications
- [ ] SMS notifications
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Issue voting system
- [ ] Community discussions
- [ ] Gamification (badges, points)

### Phase 3 Features
- [ ] AI-powered issue categorization
- [ ] Predictive maintenance
- [ ] Integration with city systems
- [ ] Public API for third-party apps
- [ ] Blockchain for transparency
- [ ] IoT sensor integration

## 📚 Documentation

### Available Documentation
- [README.md](README.md) - Project overview
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment guide
- [backend/README.md](backend/README.md) - Backend API docs
- [frontend/README.md](frontend/README.md) - Frontend docs
- [PROJECT_INFO.md](PROJECT_INFO.md) - This file

## 🤝 Contributing

### How to Contribute
1. Fork the repository
2. Create feature branch
3. Make changes
4. Write tests
5. Submit pull request

### Code Standards
- ESLint configuration
- Prettier formatting
- Conventional commits
- Code review required

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **Google Gemini**: AI capabilities
- **OpenStreetMap**: Map tiles
- **MongoDB Atlas**: Database hosting
- **Render**: Backend hosting
- **Vercel**: Frontend hosting
- **Open Source Community**: Libraries and tools

## 📞 Contact

**Developer**: Eppili Ashok Kumar  
**Email**: eppiliashokkumara@gmail.com  
**GitHub**: [EPILIASHOKKUMAR](https://github.com/EPILIASHOKKUMAR)  
**LinkedIn**: [Connect on LinkedIn](https://www.linkedin.com/in/eppili-ashok-kumar)

## 🎓 Academic Information

**Institution**: [Your Institution Name]  
**Course**: [Your Course Name]  
**Year**: 2024-2025  
**Project Type**: Capstone Project  
**Supervisor**: [Supervisor Name]

---

**Last Updated**: February 24, 2026  
**Version**: 1.0.0  
**Status**: Production Ready ✅

Made with ❤️ for better civic engagement
