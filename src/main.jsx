import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Ensure root element exists
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

console.log('React app starting...');

try {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log('React app rendered successfully');
} catch (error) {
  console.error('Error rendering app:', error);
  rootElement.innerHTML = `
    <div style="padding: 20px; font-family: Arial;">
      <h1>Error Loading App</h1>
      <p>${error.message}</p>
      <pre>${error.stack}</pre>
    </div>
  `;
}

