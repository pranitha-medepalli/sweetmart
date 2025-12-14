# Debug Instructions for Blank Page

## Immediate Steps

1. **Open Browser Console (F12)**
   - Go to Console tab
   - Look for any red errors
   - Share the error messages

2. **Check Terminal Output**
   - Where you ran `npm run dev`
   - Look for any error messages
   - Should see: "VITE v5.x.x ready"

3. **Verify Files Exist**
   Run these commands in the project root:
   ```powershell
   Test-Path src\App.jsx
   Test-Path src\main.jsx
   Test-Path index.html
   ```

## Quick Fix: Test with Minimal App

If you want to test if React is working, temporarily replace `src/App.jsx` with:

```jsx
function App() {
  return (
    <div style={{
      padding: '50px',
      backgroundColor: '#fef3c7',
      minHeight: '100vh',
      textAlign: 'center'
    }}>
      <h1 style={{color: '#d97706'}}>✅ React is Working!</h1>
      <p>If you see this, React is rendering correctly.</p>
      <p>Now restore the original App.jsx</p>
    </div>
  );
}
export default App;
```

## Most Common Causes

1. **JavaScript Error** - Check browser console
2. **Missing Dependencies** - Run `npm install`
3. **Port Conflict** - Another app using port 3000
4. **Import Error** - A component file is missing
5. **CSS Loading Issue** - Check if index.css exists

## What to Share

If still not working, please share:
1. Browser console errors (screenshot or copy text)
2. Terminal output from `npm run dev`
3. Any error messages you see

