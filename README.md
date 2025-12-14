# Quick Start Guide

## Fix Blank Page Issue

The blank page has been fixed by:
1. ✅ Fixed import order in App.jsx
2. ✅ Added ErrorBoundary to catch React errors
3. ✅ Improved loading states
4. ✅ Better error handling

## Setup Steps

### 1. Start Backend Server

```bash
cd backend
npm install
npm run dev
```

The backend should start on `http://localhost:5000`

### 2. Seed the Database

In a new terminal, run:

```bash
cd backend
npm run seed
```

This will create:
- Admin user: `admin@sweetmart.com` / `admin123`
- Regular user: `user@sweetmart.com` / `user123`
- 15 Indian sweets with images

### 3. Start Frontend

In another terminal:

```bash
npm install
npm run dev
```

The frontend should start on `http://localhost:3000`

### 4. Access the Application

1. Open `http://localhost:3000` in your browser
2. You should see the Login page
3. Login with:
   - Email: `admin@sweetmart.com`
   - Password: `admin123`

## Troubleshooting

### If you still see a blank page:

1. **Check Browser Console** (F12)
   - Look for JavaScript errors
   - Check Network tab for failed API calls

2. **Verify Backend is Running**
   - Check `http://localhost:5000/health`
   - Should return: `{"status":"OK",...}`

3. **Check Environment Variables**
   - Frontend `.env` should have: `VITE_API_BASE_URL=http://localhost:5000/api`
   - Backend `.env` should have MongoDB connection

4. **Clear Browser Cache**
   - Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

5. **Check MongoDB Connection**
   - Ensure MongoDB is running
   - Check `MONGODB_URI` in `backend/.env`

## Features

- ✅ 15 Indian sweets with images
- ✅ User authentication (Login/Register)
- ✅ Role-based access (Admin/User)
- ✅ Sweet management (CRUD operations)
- ✅ Purchase functionality
- ✅ Search and filter
- ✅ Responsive design

## Default Accounts

**Admin:**
- Email: `admin@sweetmart.com`
- Password: `admin123`

**User:**
- Email: `user@sweetmart.com`
- Password: `user123`

