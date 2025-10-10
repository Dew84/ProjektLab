// src/App.js
import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import './App.css';
import authService from './services/authService';
import AdListPage from './pages/AdListPage';
import AdDetailPage from './pages/AdDetailPage';
import CreateAdPage from './pages/CreateAdPage';
import AdminPage from './pages/AdminPage';
import OwnAdListPage from './pages/OwnAdListPage';


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
  const [categoryId, setCategoryId] = useState(null);
  const [selectedAdId, setSelectedAdId] = useState(null);

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return (
            <LoginPage
               
          setUser={setUser}
          setCurrentPage={setCurrentPage}
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
                setCurrentPage={setCurrentPage}
            />
        );
      case 'adlist':
        return <AdListPage
          setUser={setUser}
          categoryId={categoryId}
          setCurrentPage={setCurrentPage}
          setSelectedAdId={setSelectedAdId} />;
      case 'adDetails':
        return <AdDetailPage adId={selectedAdId} setCurrentPage={setCurrentPage}/>;
      case 'createAd':
        return <CreateAdPage userId={user} adId={selectedAdId} />;
      case 'ownAds':
        return <OwnAdListPage 
                  setCurrentPage={setCurrentPage}
                  setUser={setUser}
                  setSelectedAdId={setSelectedAdId} 
                />;
      case 'admin':
        return (
            <AdminPage
                user={user}
                onBackHome={() => setCurrentPage('home')}
                setCurrentPage={setCurrentPage}
            />
        );

      default:
        return (
            <HomePage
                setCurrentPage={setCurrentPage}
                user={user}
                goProfile={() => setCurrentPage('profile')}
                // ha a HomePage-en vannak ezek a gombok, jó ha átadod:
                goLogin={() => setCurrentPage('login')}
                goRegister={() => setCurrentPage('register')}
                setCategoryId={setCategoryId}
                setSelectedAdId={setSelectedAdId}
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
        setCategoryId={setCategoryId}
        setSelectedAdId={setSelectedAdId}
      />
      {renderPage()}
    </div>
  );
}

export default App;
