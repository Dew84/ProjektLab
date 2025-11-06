import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import { Badge, User as UserIcon } from 'lucide-react';
import conversationService from '../services/conversationService';

function Navbar({ user, setUser, setSelectedAdId }) {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [hasNewMessages, setHasNewMessages] = useState(false);

  useEffect(() => {
    const checkMessages = async () => {
      if (!user) return;

      try {
        const response = await conversationService.getNewMessageExistByUserId(user.id);
        if (response.status === 200) {
          setHasNewMessages(true);
        } else {
          setHasNewMessages(false);
        }
      } catch (err) {
        console.error("Nem sikerült lekérdezni az üzeneteket:", err);
        setHasNewMessages(false);
      }
    };

    checkMessages();
  }, [user]);


  const isAdmin = String(user?.role ?? user?.Role ?? user?.roles ?? '')
    .toLowerCase()
    .includes('admin');

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
  }
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

          {user && isAdmin && (
            <button className="navbar-button admin-btn" onClick={handleAdminPanel}>
              ⚙️ Admin feladatok
            </button>
          )}
        </div>

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
                onClick={() => navigate('/profile')}
              >
                <UserIcon size={18} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                {user?.userName || user?.name || ''}
              </button>
              <button className="navbar-button notification-btn" onClick={handleConversations}>
                Üzenetek
                {hasNewMessages && <span className="badge">!</span>}
              </button>
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