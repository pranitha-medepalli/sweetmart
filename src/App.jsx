import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AdminPanel from './components/AdminPanel';
import ErrorBoundary from './components/ErrorBoundary';

const AppRoutes = () => {
  const { user, loading } = useAuth();

  console.log('AppRoutes rendered, loading:', loading, 'user:', user);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="loading" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', backgroundColor: '#fef3c7' }}>
        Loading...
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={user ? <Navigate to="/dashboard" replace /> : <Login />}
      />
      <Route
        path="/register"
        element={user ? <Navigate to="/dashboard" replace /> : <Register />}
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute adminOnly>
            <Layout>
              <AdminPanel />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route 
        path="/" 
        element={
          user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
        } 
      />
    </Routes>
  );
};

function App() {
  console.log('App component rendering...');
  
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;

