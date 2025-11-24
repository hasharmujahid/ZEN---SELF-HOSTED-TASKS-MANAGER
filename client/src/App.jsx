import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import AuthContext, { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/login" />;
};

const Navbar = ({ theme, toggleTheme, getThemeIcon }) => {
  const { user, logout } = useContext(AuthContext);
  return (
    <header className="container" style={{ paddingTop: '20px', paddingBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h1><Link to="/">ZEN</Link></h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <button onClick={toggleTheme} className="btn" style={{ fontSize: '1.2rem', padding: '5px' }}>
          {getThemeIcon()}
        </button>
        {user ? (
          <>
            <Link to="/profile" style={{ fontWeight: '500' }}>{user.username}</Link>
            <button onClick={logout} className="btn" style={{ border: '1px solid var(--border-color)' }}>Logout</button>
          </>
        ) : (
          <div style={{ display: 'flex', gap: '10px' }}>
            <Link to="/login" className="btn" style={{ border: '1px solid var(--border-color)' }}>Login</Link>
            <Link to="/register" className="btn btn-primary">Sign Up</Link>
          </div>
        )}
      </div>
    </header>
  );
};

const HomeRoute = () => {
  const { user } = useContext(AuthContext);
  return user ? <Navigate to="/dashboard" /> : <div className="card"><h2>Welcome to ZEN</h2><p>Your calm productivity companion.</p></div>;
};

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => {
      if (prev === 'light') return 'dark';
      if (prev === 'dark') return 'catppuccin';
      return 'light';
    });
  };

  const getThemeIcon = () => {
    if (theme === 'light') return '🌙';
    if (theme === 'dark') return '🐱';
    return '☀️';
  };

  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar theme={theme} toggleTheme={toggleTheme} getThemeIcon={getThemeIcon} />
          <main className="container">
            <Routes>
              <Route path="/" element={<HomeRoute />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
              <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
