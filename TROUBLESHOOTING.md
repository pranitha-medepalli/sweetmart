# Troubleshooting Blank Page Issue

## Quick Checks

### 1. Check Browser Console (F12)
Open the browser console and look for:
- **Red errors** - These will tell you what's wrong
- **Console logs** - Should see "React app starting..." and "App component rendering..."

### 2. Verify Dev Server is Running
```bash
# Check if Vite is running
# You should see output like:
# VITE v5.x.x  ready in xxx ms
# ➜  Local:   http://localhost:3000/
```

### 3. Check Network Tab
- Open DevTools (F12) → Network tab
- Refresh the page
- Look for failed requests (red)
- Check if `main.jsx` is loading (should be 200 status)

### 4. Common Issues

#### Issue: "Cannot find module" errors
**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

#### Issue: Port 3000 already in use
**Solution:**
```bash
# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or change port in vite.config.js
```

#### Issue: CORS errors
**Solution:**
- Make sure backend is running on port 5000
- Check `backend/.env` has `CORS_ORIGIN=http://localhost:3000`

#### Issue: MongoDB connection errors
**Solution:**
- Make sure MongoDB is running
- Check `backend/.env` has correct `MONGODB_URI`

## Debug Steps

### Step 1: Test if React is working
Temporarily replace `src/App.jsx` content with:
```jsx
function App() {
  return <div style={{padding: '20px'}}>React is working!</div>;
}
export default App;
```

If this shows, React is working. The issue is in your components.

### Step 2: Check each component
Comment out components one by one to find the problematic one.

### Step 3: Check imports
Make sure all imports are correct:
- All component files exist
- All CSS files exist
- All paths are correct

## Still Not Working?

1. **Clear browser cache**: Ctrl+Shift+Delete
2. **Try incognito mode**
3. **Check if backend is running**: `http://localhost:5000/health`
4. **Check terminal for errors** where `npm run dev` is running

