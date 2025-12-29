# YoniMedicare Deployment Guide

## 🚀 Free Hosting Setup (Vercel + Render)

### Step 1: Setup MongoDB Atlas (Free Tier)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create new cluster (M0 Sandbox - Free)
4. Create database user with username/password
5. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/yonimedicare?retryWrites=true&w=majority`

### Step 2: Deploy Backend to Render (Free)

1. Go to [Render](https://render.com)
2. Create free account
3. Click "New" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Build Command**: `npm install && cd client && npm run build`
   - **Start Command**: `npm start`
   - **Node Version**: `18.x`
6. Add Environment Variables in Render Dashboard:
   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/yonimedicare?retryWrites=true&w=majority
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_REFRESH_SECRET=your-super-secret-refresh-key-here
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   FROM_EMAIL=noreply@yonimedicare.com
   FROM_NAME=YoniMedicare
   ```
7. Deploy and get your Render URL: `https://your-app-name.onrender.com`

### Step 3: Deploy Frontend to Vercel (Free)

1. Go to [Vercel](https://vercel.com)
2. Create free account
3. Click "New Project"
4. Import your GitHub repository
5. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `./client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Add Environment Variable:
   ```
   VITE_API_URL=https://your-app-name.onrender.com
   ```
7. Deploy and get your Vercel URL

### Step 4: Update API Configuration

In your client code, update the API URL:

```javascript
// client/src/api.js or client/src/utils/api.js
const API_URL =
  import.meta.env.VITE_API_URL || "https://yonimedicare.onrender.com";
```

## 🔧 Configuration Files Created:

- `vercel.json` - Vercel deployment config
- `render.yaml` - Render deployment config
- `.env.production` - Production environment variables template

## 📱 Alternative Free Hosting Options:

### Netlify (Frontend Alternative)

1. Build frontend: `cd client && npm run build`
2. Upload `client/dist` folder to Netlify
3. Set redirect rule for SPA routing

### Railway (Backend Alternative)

1. Similar to Render setup
2. Use Railway's free tier
3. Configure environment variables

### Heroku (Backend Alternative)

1. Create Procfile: `web: npm start`
2. Deploy to Heroku free tier
3. Configure environment variables

## ⚡ Quick Deployment Commands:

```bash
# Frontend build for deployment
cd client
npm run build

# Backend deployment prep
npm install --production
```

## 🔍 Testing Your Deployment:

1. Backend: Visit `https://your-app-name.onrender.com/api/health`
2. Frontend: Visit your Vercel URL
3. Test login, registration, and medicine ordering

## 🛠️ Troubleshooting:

- **CORS Issues**: Ensure backend allows frontend URL
- **Database Connection**: Check MongoDB Atlas whitelist
- **Build Failures**: Verify Node.js version compatibility
- **Environment Variables**: Double-check all required variables

## 📊 Free Tier Limits:

- **Render**: 750 hours/month, sleeps after 15min inactivity
- **Vercel**: 100GB bandwidth/month
- **MongoDB Atlas**: 512MB storage, suitable for development

Your YoniMedicare app will be live and fully functional! 🎉
