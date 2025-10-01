import React, { useState } from 'react';
import './Navbar.css';

function Navbar({ user, setUser }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleNewAd = () => {
    if (!user) {
      alert('Bejelentkezés szükséges ehhez!');
      return;
    }
    console.log('Új hirdetés létrehozása');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Keresés:', searchQuery);
  };

  const handleLogin = () => {
    console.log('Login oldal megnyitása');
  };

  const handleRegister = () => {
    console.log('Register oldal megnyitása');
  };

  const handleAdminPanel = () => {
    console.log('Admin panel megnyitása');
  };

  const handleLogoClick = () => {
    console.log('Főoldal');
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* BAL OLDAL */}
        <div className="navbar-left">
          <h1 className="navbar-logo" onClick={handleLogoClick}>
            TradeByte
          </h1>
          
          <form className="navbar-search" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Keresés..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">
              🔍 Keresés
            </button>
          </form>

          <button className="navbar-button new-ad-btn" onClick={handleNewAd}>
            ➕ Új hirdetés
          </button>

          {/* ADMIN GOMB - csak adminnak látszik */}
          {user && user.role === 'Admin' && (
            <button className="navbar-button admin-btn" onClick={handleAdminPanel}>
              ⚙️ Admin feladatok
            </button>
          )}
        </div>

        {/* JOBB OLDAL */}
        <div className="navbar-right">
          {!user ? (
            <>
              <button className="navbar-button register-btn" onClick={handleRegister}>
                Regisztráció
              </button>
              <button className="navbar-button login-btn" onClick={handleLogin}>
                Bejelentkezés
              </button>
            </>
          ) : (
            <div className="user-info">
              <span>Üdv, {user.name}!</span>
              <button className="navbar-button logout-btn" onClick={handleLogout}>
                Kijelentkezés
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;