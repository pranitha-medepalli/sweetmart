import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiLogOut, FiShoppingBag, FiUser, FiSettings } from 'react-icons/fi';
import './Layout.css';

const Layout = ({ children }) => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="app-layout">
      <header className="header">
        <div className="container">
          <div className="header-content">
            <Link to="/dashboard" className="logo">
              <FiShoppingBag className="logo-icon" />
              <span>SweetMart</span>
            </Link>
            <nav className="nav">
              {user && (
                <>
                  <Link to="/dashboard" className="nav-link">
                    <FiShoppingBag /> Dashboard
                  </Link>
                  {isAdmin() && (
                    <Link to="/admin" className="nav-link">
                      <FiSettings /> Admin Panel
                    </Link>
                  )}
                  <div className="user-info">
                    <FiUser />
                    <span>{user.name}</span>
                    {isAdmin() && <span className="badge-admin">Admin</span>}
                  </div>
                  <button onClick={handleLogout} className="btn btn-secondary">
                    <FiLogOut /> Logout
                  </button>
                </>
              )}
            </nav>
          </div>
        </div>
      </header>
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;

