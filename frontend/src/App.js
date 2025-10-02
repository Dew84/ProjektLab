import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'login', 'register'

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage setUser={setUser} />;
      case 'register':
        return <RegisterPage setUser={setUser} />;
      default:
        return <HomePage />;
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