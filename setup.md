# YoniMediCare Setup Instructions

## Quick Setup Guide

### 1. Install Dependencies
```bash
# In server directory
cd server
npm install

# In client directory  
cd ../client
npm install
```

### 2. Environment Setup
```bash
# In server directory
cd server
cp .env.example .env
# Edit .env with your MongoDB connection string
```

### 3. Start MongoDB
Make sure MongoDB is running on your system or use MongoDB Atlas.

### 4. Seed Database
```bash
# In server directory
npm run seed
```

### 5. Start Servers
```bash
# Terminal 1: Start backend server
cd server
npm run dev

# Terminal 2: Start frontend
cd ../client
npm run dev
```

### 6. Demo Credentials

#### Pharmacy Portal
- **Email:** `pharmacy@yonimedicare.com`
- **Password:** `pharmacy123`

#### Admin Portal  
- **Email:** `admin@yonimedicare.com`
- **Password:** `admin123`

#### Regular User
- **Email:** `user@example.com`
- **Password:** `user123`

### 7. Access URLs
- **Frontend:** http://localhost:5173
- **API:** http://localhost:5000
- **Login:** http://localhost:5173/login

## Troubleshooting

### 401 Unauthorized Error
This means the server isn't running or database isn't seeded. Make sure:
1. MongoDB is running
2. You've run `npm run seed` in the server directory
3. Backend server is running on port 5000

### Import Errors
If you see icon import errors, the frontend is using fallback icons and should still work.

### Database Connection
If MongoDB connection fails, check your `.env` file and ensure MongoDB is accessible.
