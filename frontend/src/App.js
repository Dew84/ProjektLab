import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import AdListPage from './pages/AdListPage';
import AdDetailPage from './pages/AdDetailPage';
import CreateAdPage from './pages/CreateAdPage';
import AdminPage from './pages/AdminPage';
import OwnAdListPage from './pages/OwnAdListPage';
import AllCategoriesPage from './pages/AllCategoriesPage';
import AllAdsPage from './pages/AllAdsPage';
import './App.css';
import authService from './services/authService';
import ChatPage from './pages/ChatPage';
import OwnConversationListPage from './pages/OwnConversationListPage';
import PublicProfilePage from './pages/PublicProfilePage';

function App() {
  const [user, setUser] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [selectedAdId, setSelectedAdId] = useState(null);
  const [homeCategories, setHomeCategories] = useState([]);

  useEffect(() => {
    if (authService.isAuthenticated()) {
      const u = authService.getCurrentUser();
      setUser(u);
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar
          user={user}
          setUser={setUser}
          setCategoryId={setCategoryId}
          setSelectedAdId={setSelectedAdId}
        />

        <Routes>
          {/* Főoldal */}
          <Route
            path="/"
            element={
              <HomePage
                user={user}
                setCategoryId={setCategoryId}
                setSelectedAdId={setSelectedAdId}
                homeCategories={homeCategories}
                setHomeCategories={setHomeCategories}
              />
            }
          />

          {/* ÚJ: Összes kategória */}
          <Route
            path="/categories"
            element={<AllCategoriesPage />}
          />

          {/* ÚJ: Összes hirdetés */}
          <Route
            path="/all-ads"
            element={<AllAdsPage />}
          />

          {/* Auth oldalak */}
          <Route
            path="/login"
            element={<LoginPage setUser={setUser} />}
          />
          <Route
            path="/register"
            element={<RegisterPage setUser={setUser} />}
          />

          {/* Profil */}
          <Route
            path="/profile"
            element={user ? <ProfilePage user={user} /> : <Navigate to="/login" />}
          />

          {/* Hirdetések */}
          <Route
            path="/ads"
            element={
              <AdListPage
                categoryId={categoryId}
                setSelectedAdId={setSelectedAdId}
              />
            }
          />
          <Route
            path="/ads/:id"
            element={<AdDetailPage/>}
          />
          <Route
            path="/ads/create"
            element={user ? <CreateAdPage user={user} /> : <Navigate to="/login" />}
          />
          <Route
            path="/ads/edit/:id"
            element={user ? <CreateAdPage user={user} /> : <Navigate to="/login" />}
          />
          <Route
            path="/my-ads"
            element={user ? <OwnAdListPage setSelectedAdId={setSelectedAdId} /> : <Navigate to="/login" />}
          />

          {/* Admin */}
          <Route
            path="/admin"
            element={user?.role?.toLowerCase().includes('admin') ? <AdminPage user={user} /> : <Navigate to="/" />}
          />
          {/* Egy beszélgetés */}
          <Route
            path="/chat/:user2Id"
            element={user ? <ChatPage user1={user} /> : <Navigate to="/login" />}
          />
          {/* Üzenetek */}
          <Route
            path="/conversations"
            element={user ? <OwnConversationListPage owner={user} /> : <Navigate to="/login" />}
          />
          <Route path="/userProfile" element={<PublicProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;