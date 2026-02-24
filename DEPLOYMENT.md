# 🚀 Deployment Guide - Civic Issue Reporter

Complete guide for deploying the Civic Issue Reporter application to production.

## 📋 Prerequisites

Before deploying, ensure you have:

- ✅ GitHub account with repository access
- ✅ MongoDB Atlas account
- ✅ Google Cloud Console account
- ✅ Gmail account for email notifications
- ✅ Render account (for backend)
- ✅ Vercel account (for frontend)

## 🗄️ Step 1: MongoDB Atlas Setup

### 1.1 Create Database

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign in or create account
3. Create a new cluster (Free tier available)
4. Wait for cluster to be created (2-3 minutes)

### 1.2 Create Database User

1. Go to **Database Access**
2. Click **Add New Database User**
3. Choose **Password** authentication
4. Username: `your_username`
5. Password: Generate secure password
6. Database User Privileges: **Read and write to any database**
7. Click **Add User**

### 1.3 Configure Network Access

1. Go to **Network Access**
2. Click **Add IP Address**
3. Click **Allow Access from Anywhere**
4. IP Address: `0.0.0.0/0`
5. Click **Confirm**

### 1.4 Get Connection String

1. Go to **Database** → **Connect**
2. Choose **Connect your application**
3. Driver: **Node.js**
4. Copy connection string
5. Replace `<password>` with your database user password
6. Replace `<dbname>` with `civic-reporter`

Example:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/civic-reporter?retryWrites=true&w=majority
```

## 🔑 Step 2: Google Cloud Console Setup

### 2.1 Create Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project: **Civic Reporter**
3. Enable **Google+ API**

### 2.2 Configure OAuth Consent Screen

1. Go to **APIs & Services** → **OAuth consent screen**
2. User Type: **External**
3. App name: **Civic Issue Reporter**
4. User support email: Your email
5. Developer contact: Your email
6. Click **Save and Continue**
7. Scopes: Add `email` and `profile`
8. Test users: Add your email
9. Click **Save and Continue**

### 2.3 Create OAuth Credentials

1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **OAuth client ID**
3. Application type: **Web application**
4. Name: **Civic Reporter Web Client**

5. **Authorized JavaScript origins:**
   ```
   http://localhost:3000
   http://localhost:5000
   https://capstone-project-three-brown.vercel.app
   https://capstone-project-1-erp4.onrender.com
   ```

6. **Authorized redirect URIs:**
   ```
   http://localhost:5000/api/auth/google/callback
   https://capstone-project-1-erp4.onrender.com/api/auth/google/callback
   http://localhost:3000/auth/google/success
   https://capstone-project-three-brown.vercel.app/auth/google/success
   ```

7. Click **Create**
8. Copy **Client ID** and **Client Secret**

### 2.4 Get Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click **Create API Key**
3. Select your project
4. Copy the API key

## 📧 Step 3: Gmail App Password

### 3.1 Enable 2-Factor Authentication

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification**
3. Follow the setup process

### 3.2 Generate App Password

1. Go to [App Passwords](https://myaccount.google.com/apppasswords)
2. Select app: **Mail**
3. Select device: **Other (Custom name)**
4. Name: **Civic Reporter**
5. Click **Generate**
6. Copy the 16-character password

## 🔧 Step 4: Backend Deployment (Render)

### 4.1 Create Web Service

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **New** → **Web Service**
3. Connect your GitHub repository
4. Select repository: **CAPSTONE-PROJECT**

### 4.2 Configure Service

- **Name**: `civic-reporter-backend`
- **Region**: Choose closest to your users
- **Branch**: `main`
- **Root Directory**: `backend`
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `node server.js`
- **Instance Type**: Free

### 4.3 Add Environment Variables

Click **Advanced** → **Add Environment Variable**

```env
NODE_ENV=production
PORT=10000
FRONTEND_URL=https://capstone-project-three-brown.vercel.app
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/civic-reporter?retryWrites=true&w=majority
JWT_SECRET=your_random_jwt_secret_min_32_chars
JWT_REFRESH_SECRET=your_random_refresh_secret_min_32_chars
JWT_EXPIRE=24h
JWT_REFRESH_EXPIRE=7d
GEMINI_API_KEY=your_gemini_api_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=https://your-backend-url.onrender.com/api/auth/google/callback
SESSION_SECRET=your_random_session_secret_min_32_chars
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_16_char_app_password
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/webp
```

### 4.4 Deploy

1. Click **Create Web Service**
2. Wait for deployment (5-10 minutes)
3. Note your backend URL: `https://your-service.onrender.com`

### 4.5 Setup Admin Account

After first deployment, run setup scripts:

1. Go to **Shell** tab in Render dashboard
2. Run:
```bash
node setup-mongodb.js
node setup-default-admin.js
```

Or use the Render API to execute commands.

## 🎨 Step 5: Frontend Deployment (Vercel)

### 5.1 Import Project

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Add New** → **Project**
3. Import from GitHub
4. Select repository: **CAPSTONE-PROJECT**

### 5.2 Configure Project

- **Framework Preset**: Create React App
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `build`
- **Install Command**: `npm install`

### 5.3 Add Environment Variables

Click **Environment Variables**:

```env
REACT_APP_API_URL=https://your-backend-url.onrender.com/api
CI=false
```

Replace `your-backend-url` with your actual Render backend URL.

### 5.4 Deploy

1. Click **Deploy**
2. Wait for deployment (2-5 minutes)
3. Note your frontend URL: `https://your-project.vercel.app`

## 🔄 Step 6: Update Google OAuth URLs

Now that you have production URLs, update Google OAuth:

### 6.1 Update Authorized Origins

1. Go to [Google Cloud Console Credentials](https://console.cloud.google.com/apis/credentials)
2. Click your OAuth client
3. Add to **Authorized JavaScript origins**:
   ```
   https://your-backend-url.onrender.com
   https://your-frontend-url.vercel.app
   ```

### 6.2 Update Redirect URIs

Add to **Authorized redirect URIs**:
```
https://your-backend-url.onrender.com/api/auth/google/callback
https://your-frontend-url.vercel.app/auth/google/success
```

### 6.3 Save Changes

Click **Save**

## 🔄 Step 7: Update Backend Environment

Update Render environment variables with actual URLs:

1. Go to Render dashboard
2. Select your backend service
3. Go to **Environment** tab
4. Update:
   ```
   FRONTEND_URL=https://your-frontend-url.vercel.app
   GOOGLE_CALLBACK_URL=https://your-backend-url.onrender.com/api/auth/google/callback
   ```
5. Click **Save Changes**
6. Service will automatically redeploy

## ✅ Step 8: Verification

### 8.1 Test Backend

Visit: `https://your-backend-url.onrender.com/api/health`

Expected response:
```json
{
  "status": "OK",
  "message": "Civic Reporter API is running",
  "timestamp": "2024-02-24T10:00:00.000Z",
  "environment": "production"
}
```

### 8.2 Test Frontend

1. Visit: `https://your-frontend-url.vercel.app`
2. Should see homepage
3. Click **Login** → Should load login page
4. Try **Sign in with Google** → Should redirect to Google

### 8.3 Test Full Flow

1. **Register new user**
   - Go to Sign Up
   - Fill form
   - Submit
   - Check email for confirmation

2. **Login**
   - Use registered credentials
   - Should redirect to dashboard

3. **Report Issue**
   - Click Report Issue
   - Upload image
   - Fill details
   - Submit
   - Check email for confirmation

4. **Admin Login**
   - Use: admin@civic.com / admin123
   - Should see admin dashboard
   - View reported issues

5. **Update Issue Status**
   - Select an issue
   - Change status
   - Add notes
   - User should receive email

## 🔧 Step 9: Custom Domain (Optional)

### 9.1 Vercel Custom Domain

1. Go to Vercel project settings
2. Click **Domains**
3. Add your domain
4. Update DNS records as instructed
5. Wait for SSL certificate

### 9.2 Render Custom Domain

1. Go to Render service settings
2. Click **Custom Domains**
3. Add your domain
4. Update DNS records
5. Wait for SSL certificate

### 9.3 Update OAuth URLs

After adding custom domains, update Google OAuth with new URLs.

## 🔒 Security Checklist

- ✅ All environment variables set correctly
- ✅ MongoDB IP whitelist configured
- ✅ Strong JWT secrets (min 32 characters)
- ✅ Gmail app password (not regular password)
- ✅ HTTPS enabled on all URLs
- ✅ CORS configured for frontend URL only
- ✅ Rate limiting enabled
- ✅ File upload restrictions in place

## 📊 Monitoring

### Render Monitoring

1. Go to service dashboard
2. View **Metrics** tab
3. Monitor:
   - CPU usage
   - Memory usage
   - Response times
   - Error rates

### Vercel Analytics

1. Go to project dashboard
2. View **Analytics** tab
3. Monitor:
   - Page views
   - Performance
   - Web vitals

## 🐛 Troubleshooting

### Backend Not Starting

**Check logs in Render:**
1. Go to service dashboard
2. Click **Logs** tab
3. Look for errors

**Common issues:**
- MongoDB connection failed → Check MONGODB_URI
- Missing environment variables → Verify all vars set
- Port already in use → Render handles this automatically

### Frontend Not Loading

**Check Vercel deployment logs:**
1. Go to project dashboard
2. Click latest deployment
3. View build logs

**Common issues:**
- Build failed → Check for syntax errors
- API not found → Verify REACT_APP_API_URL
- Environment variables not set → Add in Vercel settings

### Google OAuth Not Working

**Check:**
1. Redirect URIs match exactly (including https://)
2. Origins include both frontend and backend URLs
3. GOOGLE_CALLBACK_URL in backend matches redirect URI
4. Client ID and Secret are correct

### Email Not Sending

**Check:**
1. Gmail 2FA enabled
2. App password generated (not regular password)
3. EMAIL_USER and EMAIL_PASS correct
4. EMAIL_PORT is 587

### Database Connection Issues

**Check:**
1. MongoDB Atlas IP whitelist includes 0.0.0.0/0
2. Database user has correct permissions
3. Password in connection string is URL-encoded
4. Database name is correct

## 🔄 Continuous Deployment

### Automatic Deployments

Both Render and Vercel support automatic deployments:

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Update feature"
   git push origin main
   ```

2. **Automatic Build**
   - Render detects push and rebuilds backend
   - Vercel detects push and rebuilds frontend

3. **Zero Downtime**
   - Both platforms deploy with zero downtime
   - Old version runs until new version is ready

## 📞 Support

### Render Support
- [Render Documentation](https://render.com/docs)
- [Render Community](https://community.render.com/)

### Vercel Support
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Support](https://vercel.com/support)

### MongoDB Support
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [MongoDB Community](https://www.mongodb.com/community/forums/)

## 🎉 Deployment Complete!

Your Civic Issue Reporter application is now live and ready to use!

**Production URLs:**
- Frontend: https://capstone-project-three-brown.vercel.app
- Backend: https://capstone-project-1-erp4.onrender.com

**Admin Credentials:**
- Email: admin@civic.com
- Password: admin123

**Remember to:**
- Change admin password after first login
- Monitor application performance
- Check logs regularly
- Keep dependencies updated
- Backup database regularly

---

Deployed with ❤️ using Render and Vercel
