import React, { useState } from 'react';
import './Navbar.css';
import { User as UserIcon } from 'lucide-react';

function Navbar({ user, setUser, setCurrentPage, setSelectedAdId }) {
  const [searchQuery, setSearchQuery] = useState('');

  // Robusztusabb admin-ellenőrzés
  const isAdmin = String(user?.role ?? user?.Role ?? user?.roles ?? '')
      .toLowerCase()
      .includes('admin');

  const handleNewAd = () => {
    if (!user) {
      alert('Bejelentkezés szükséges ehhez!');
      return;
    }
    setSelectedAdId(null);
    setCurrentPage('createAd');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Keresés:', searchQuery);
  };

  const handleLogin = () => setCurrentPage('login');
  const handleRegister = () => setCurrentPage('register');

  // 🔧 NAVIGÁLJON az admin oldalra
  const handleAdminPanel = () => {
    setCurrentPage('admin');
  };

  const handleLogoClick = () => setCurrentPage('home');

  const handleLogout = () => {
    // 🔧 töröld a tokent és a usert is
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setCurrentPage('home');
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

            {/* 🔧 Csak adminnak jelenjen meg */}
            {user && isAdmin && (
                <button className="navbar-button admin-btn" onClick={handleAdminPanel} title="Admin felület">
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
                  <span>Üdv, </span>
                  <button
                      className="navbar-button profile-btn"
                      onClick={() => setCurrentPage('profile')}
                      title="Profil megnyitása"
                  >
                    <UserIcon size={18} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                    {user?.userName || user?.name || ''}
                  </button>


                  {/*isAdmin && (
                      <button
                          className="navbar-button admin-btn"
                          onClick={handleAdminPanel}
                          title="Admin felület"
                      >
                        Admin
                      </button>
                  )*/}

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
