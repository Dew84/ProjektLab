// src/App.js
import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import './App.css';
import authService from './services/authService';

function App() {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('home'); // kezdjen Home-on

  useEffect(() => {
    // Ha be van lépve, betöltjük a usert, de NINCS else → marad 'home' vendégként is
    if (authService.isAuthenticated()) {
      const u = authService.getCurrentUser();
      setUser(u);
      setCurrentPage('home');
    }
  }, []);

  const handleLoginSuccess = (u) => {
    setUser(u);
    setCurrentPage('home');
  };

  const handleRegisterSuccess = (u) => {
    setUser(u);
    setCurrentPage('home');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return (
            <LoginPage
                setUser={setUser}
                onLoginSuccess={handleLoginSuccess}
                switchToRegister={() => setCurrentPage('register')}
            />
        );
      case 'register':
        return (
            <RegisterPage
                setUser={setUser}
                onRegisterSuccess={handleRegisterSuccess}
                switchToLogin={() => setCurrentPage('login')}
            />
        );
      case 'profile':
        return (
            <ProfilePage
                user={user}
                onBackHome={() => setCurrentPage('home')}
            />
        );
      default:
        return (
            <HomePage
                user={user}
                goProfile={() => setCurrentPage('profile')}
                // ha a HomePage-en vannak ezek a gombok, jó ha átadod:
                goLogin={() => setCurrentPage('login')}
                goRegister={() => setCurrentPage('register')}
            />
        );
    }
  };

  return (
      <div className="App">
        <Navbar
            user={user}
            setUser={setUser}
            setCurrentPage={setCurrentPage}
        />
        {renderPage()}
      </div>
  );
}

export default App;
