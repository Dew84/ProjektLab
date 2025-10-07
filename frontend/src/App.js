import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import './App.css';
import AdListPage from './pages/AdListPage';
import AdDetailPage from './pages/AdDetailPage';
import CreateAdPage from './pages/CreateAdPage';

function App() {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'login', 'register'
  const [categoryId, setCategoryId] = useState(null);
  const [selectedAdId, setSelectedAdId] = useState(null);

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage
          setUser={setUser}
          setCurrentPage={setCurrentPage} />;
      case 'register':
        return <RegisterPage setUser={setUser} />;
      case 'adlist':
        return <AdListPage
          setUser={setUser}
          categoryId={categoryId}
          setCurrentPage={setCurrentPage}
          setSelectedAdId={setSelectedAdId} />;
      case 'adDetails':
        return <AdDetailPage adId={selectedAdId} />;
      case 'createAd':
        return <CreateAdPage setUser={setUser} adId={selectedAdId} />;
      default:
        return <HomePage
          setCurrentPage={setCurrentPage}
          setCategoryId={setCategoryId}
          setSelectedAdId={setSelectedAdId} />;
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