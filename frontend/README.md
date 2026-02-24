# 🎨 Frontend - Civic Issue Reporter

Modern, responsive React application for reporting and tracking civic issues.

## 🌐 Live Application

**URL**: [https://capstone-project-three-brown.vercel.app](https://capstone-project-three-brown.vercel.app)

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Environment Setup

Create a `.env` file in the frontend directory:

```env
PORT=3000
REACT_APP_API_URL=http://localhost:5000/api
GENERATE_SOURCEMAP=TRUE
```

For production, create `.env.production`:

```env
REACT_APP_API_URL=https://capstone-project-1-erp4.onrender.com/api
GENERATE_SOURCEMAP=false
```

### Run Development Server

```bash
npm start
```

Application will run on `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## 🎯 Features

### User Features
- 🔐 User registration and login
- 🔑 Google OAuth sign-in
- 📝 Report civic issues with image upload
- 📍 Automatic location detection
- 🗺️ View issues on interactive map
- 📊 Personal dashboard
- 🔔 Real-time status updates
- 📧 Email notifications
- 🌓 Dark/Light theme toggle
- 📱 Fully responsive design

### Admin Features
- 👥 View all reported issues
- ✏️ Update issue status
- 📝 Add administrative notes
- 🗺️ Map view with filtering
- 🚗 Route planning for issue resolution
- 📈 Weekly reports
- 🔍 Advanced search and filters

## 📁 Project Structure

```
frontend/
├── public/
│   ├── index.html
│   ├── favicon.png
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Admin/
│   │   │   └── WeeklyReportCard.js
│   │   ├── Auth/
│   │   │   └── ProtectedRoute.js
│   │   ├── Layout/
│   │   │   ├── Navbar.js
│   │   │   └── Footer.js
│   │   ├── Map/
│   │   │   └── MapComponent.js
│   │   └── UI/
│   │       ├── Button.js
│   │       ├── Card.js
│   │       ├── Input.js
│   │       ├── Modal.js
│   │       ├── LoadingSpinner.js
│   │       ├── StatusBadge.js
│   │       ├── Switch.js
│   │       ├── ImageUpload.js
│   │       └── EnhancedImageUpload.js
│   ├── contexts/
│   │   ├── AuthContext.js
│   │   └── ThemeContext.js
│   ├── hooks/
│   │   └── useGeolocation.js
│   ├── pages/
│   │   ├── Admin/
│   │   │   ├── AdminDashboard.js
│   │   │   ├── ManageIssues.js
│   │   │   └── MapView.js
│   │   ├── Auth/
│   │   │   ├── LoginUser.js
│   │   │   ├── LoginAdmin.js
│   │   │   ├── SignupUser.js
│   │   │   └── GoogleAuthSuccess.js
│   │   ├── User/
│   │   │   ├── UserDashboard.js
│   │   │   ├── ReportIssue.js
│   │   │   └── MyIssues.js
│   │   └── Home.js
│   ├── services/
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── issueService.js
│   │   ├── imageAnalysisService.js
│   │   ├── locationService.js
│   │   └── routingService.js
│   ├── utils/
│   │   └── helpers.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── .env
├── .env.production
├── package.json
├── tailwind.config.js
└── postcss.config.js
```

## 🎨 UI Components

### Button Component
```jsx
import Button from './components/UI/Button';

<Button 
  variant="primary" 
  size="lg" 
  isLoading={false}
  onClick={handleClick}
>
  Click Me
</Button>
```

**Props:**
- `variant`: primary, secondary, danger, success
- `size`: sm, md, lg
- `isLoading`: boolean
- `disabled`: boolean

### Card Component
```jsx
import Card from './components/UI/Card';

<Card className="p-6">
  <h2>Card Title</h2>
  <p>Card content</p>
</Card>
```

### Input Component
```jsx
import Input from './components/UI/Input';
import { Mail } from 'lucide-react';

<Input
  label="Email"
  type="email"
  placeholder="Enter email"
  leftIcon={Mail}
  error={errors.email}
  {...register('email')}
/>
```

### Modal Component
```jsx
import Modal from './components/UI/Modal';

<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="Modal Title"
>
  <p>Modal content</p>
</Modal>
```

### StatusBadge Component
```jsx
import StatusBadge from './components/UI/StatusBadge';

<StatusBadge status="Pending" />
<StatusBadge status="In Progress" />
<StatusBadge status="Resolved" />
<StatusBadge status="Rejected" />
```

## 🗺️ Map Integration

### MapComponent
```jsx
import MapComponent from './components/Map/MapComponent';

<MapComponent
  issues={issues}
  center={[latitude, longitude]}
  zoom={13}
  onMarkerClick={handleMarkerClick}
/>
```

**Features:**
- Interactive markers
- Color-coded by status
- Popup with issue details
- Click to view full details
- Routing capabilities

## 🔐 Authentication

### AuthContext
```jsx
import { useAuth } from './contexts/AuthContext';

const { user, login, logout, isAuthenticated } = useAuth();

// Login
await login(email, password, role);

// Logout
await logout();

// Check authentication
if (isAuthenticated) {
  // User is logged in
}
```

### Protected Routes
```jsx
import ProtectedRoute from './components/Auth/ProtectedRoute';

<Route
  path="/dashboard"
  element={
    <ProtectedRoute allowedRoles={['user']}>
      <UserDashboard />
    </ProtectedRoute>
  }
/>
```

## 🎨 Theming

### ThemeContext
```jsx
import { useTheme } from './contexts/ThemeContext';

const { theme, toggleTheme } = useTheme();

// Toggle theme
<button onClick={toggleTheme}>
  {theme === 'dark' ? '☀️' : '🌙'}
</button>
```

## 📍 Geolocation

### useGeolocation Hook
```jsx
import useGeolocation from './hooks/useGeolocation';

const { location, error, loading, getCurrentLocation } = useGeolocation();

// Get current location
const handleGetLocation = async () => {
  const coords = await getCurrentLocation();
  console.log(coords); // { latitude, longitude }
};
```

## 🎭 Animations

Using Framer Motion for smooth animations:

```jsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

## 📱 Responsive Design

### Breakpoints (TailwindCSS)
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### Example Usage
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Responsive grid */}
</div>
```

## 🎨 Color Scheme

### Light Theme
- Primary: Blue (#3B82F6)
- Success: Green (#10B981)
- Warning: Yellow (#F59E0B)
- Danger: Red (#EF4444)
- Background: White (#FFFFFF)
- Text: Gray (#1F2937)

### Dark Theme
- Primary: Blue (#60A5FA)
- Success: Green (#34D399)
- Warning: Yellow (#FBBF24)
- Danger: Red (#F87171)
- Background: Gray (#1F2937)
- Text: White (#F9FAFB)

## 📦 Dependencies

### Core
- react: ^18.2.0
- react-dom: ^18.2.0
- react-router-dom: ^6.20.0

### UI & Styling
- tailwindcss: ^3.3.0
- framer-motion: ^10.16.0
- lucide-react: ^0.294.0

### Forms
- react-hook-form: ^7.48.0

### Maps
- leaflet: ^1.9.4
- react-leaflet: ^4.2.1

### HTTP
- axios: ^1.6.0

### State Management
- React Context API (built-in)

## 🚀 Deployment (Vercel)

### Manual Deployment

1. Install Vercel CLI
```bash
npm install -g vercel
```

2. Login to Vercel
```bash
vercel login
```

3. Deploy
```bash
vercel --prod
```

### GitHub Integration

1. Import project from GitHub
2. Set root directory: `frontend`
3. Framework preset: Create React App
4. Add environment variables:
   - `REACT_APP_API_URL`: Backend API URL
   - `CI`: false (to ignore warnings)
5. Deploy

### Environment Variables in Vercel

Go to Project Settings → Environment Variables:

```
REACT_APP_API_URL=https://capstone-project-1-erp4.onrender.com/api
CI=false
```

## 🧪 Testing

### Run Tests
```bash
npm test
```

### Test Coverage
```bash
npm test -- --coverage
```

## 🔧 Build Optimization

### Code Splitting
```jsx
import { lazy, Suspense } from 'react';

const AdminDashboard = lazy(() => import('./pages/Admin/AdminDashboard'));

<Suspense fallback={<LoadingSpinner />}>
  <AdminDashboard />
</Suspense>
```

### Image Optimization
- Use WebP format
- Lazy load images
- Compress before upload
- Use appropriate sizes

## 🐛 Troubleshooting

### Build Warnings
If build fails due to warnings, add to `.env`:
```env
CI=false
```

### API Connection Issues
- Check `REACT_APP_API_URL` is correct
- Verify backend is running
- Check CORS configuration

### Map Not Loading
- Check internet connection
- Verify Leaflet CSS is imported
- Check coordinates format

### Google OAuth Not Working
- Verify redirect URI in Google Console
- Check callback URL configuration
- Ensure credentials are correct

## 📊 Performance

### Lighthouse Scores (Target)
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 90+

### Optimization Tips
- Use React.memo for expensive components
- Implement virtual scrolling for long lists
- Lazy load routes and components
- Optimize images
- Minimize bundle size

## 📞 Support

For issues, contact: eppiliashokkumara@gmail.com

---

Built with React and TailwindCSS
