import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import { User as UserIcon } from 'lucide-react';
import conversationService from '../services/conversationService';

function Navbar({ user, setUser, setSelectedAdId }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [hasNewMessages, setHasNewMessages] = useState(false);

  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Új üzenetek lekérdezése
  useEffect(() => {
    const checkMessages = async () => {
      if (!user) {
        setHasNewMessages(false);
        return;
      }

      try {
        const response =
            await conversationService.getNewMessageExistByUserId(user.id);
        setHasNewMessages(response.status === 200);
      } catch (err) {
        console.error('Nem sikerült lekérdezni az üzeneteket:', err);
        setHasNewMessages(false);
      }
    };

    checkMessages();
  }, [user]);

  const isAdmin = String(user?.role ?? '').toLowerCase().includes('admin');

  // Dropdown bezárása, ha máshova kattintunk
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNewAd = () => {
    if (!user) {
      alert('Bejelentkezés szükséges ehhez!');
      return;
    }
    setSelectedAdId(null);
    navigate('/ads/create');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Keresés:', searchQuery);
  };

  const handleConversations = () => {
    if (!user) {
      alert('Bejelentkezés szükséges ehhez!');
      return;
    }
    navigate('/conversations');
  };

  const handleLogin = () => navigate('/login');
  const handleRegister = () => navigate('/register');
  const handleAdminPanel = () => navigate('/admin');

  const handleLogoClick = () => {
    console.log('Főoldalra navigálás logo kattintással');
    sessionStorage.setItem('keepHomeCategories', 'true');
    navigate('/', { state: { fromNavigation: true } });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
      <nav className="navbar">
        <div className="navbar-container">
          {/* BAL OLDAL – logó + kereső + új hirdetés */}
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
          </div>

          {/* JOBB OLDAL – auth + user menü + üzenetek */}
          <div className="navbar-right">
            {!user ? (
                <>
                  <button
                      className="navbar-button register-btn"
                      onClick={handleRegister}
                  >
                    Regisztráció
                  </button>
                  <button
                      className="navbar-button login-btn"
                      onClick={handleLogin}
                  >
                    Bejelentkezés
                  </button>
                </>
            ) : (
                <div className="user-info">
                  <span>Üdv, </span>

                  {/* Profil gomb + dropdown külön konténerben */}
                  <div className="user-menu" ref={menuRef}>
                    <button
                        className="navbar-button profile-btn"
                        onClick={() => setMenuOpen((prev) => !prev)}
                    >
                      <UserIcon
                          size={18}
                          style={{ marginRight: '6px', verticalAlign: 'middle' }}
                      />
                      {user?.userName || user?.name || ''} ▼
                    </button>

                    {menuOpen && (
                        <div className="dropdown-menu">
                          <button
                              onClick={() => {
                                navigate('/ads/own');
                                setMenuOpen(false);
                              }}
                          >
                            Hirdetéseim
                          </button>
                          <button
                              className="messages-dropdown-btn"
                              onClick={() => {
                                handleConversations();
                                setMenuOpen(false);
                              }}
                          >
                            Üzenetek
                            {hasNewMessages && <span className="badge-inline">•</span>}
                          </button>
                          <button
                              onClick={() => {
                                navigate('/profile');
                                setMenuOpen(false);
                              }}
                          >
                            Saját profil
                          </button>
                          {isAdmin && (
                              <button
                                  onClick={() => {
                                    handleAdminPanel();
                                    setMenuOpen(false);
                                  }}
                              >
                                Admin feladatok
                              </button>
                          )}
                        </div>
                    )}
                  </div>

                  <button
                      className="navbar-button logout-btn"
                      onClick={handleLogout}
                  >
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
