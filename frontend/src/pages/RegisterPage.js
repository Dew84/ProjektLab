import { useState } from 'react';
import authService from '../services/authService';
import userService from '../services/userService';
import './LoginPage.css'; // ugyanazt a stílust használhatja, mint a LoginPage

export default function RegisterPage(props) {
  const {
    onRegisterSuccess,
    switchToLogin,
    setUser,
    setCurrentPage,
  } = props;

  const [userName, setUserName] = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  const afterSuccess = (user) => {
    if (typeof onRegisterSuccess === 'function') return onRegisterSuccess(user);
    if (typeof setUser === 'function') setUser(user);
    if (typeof setCurrentPage === 'function') setCurrentPage('home');
  };

  const goLogin = () => {
    if (typeof switchToLogin === 'function') return switchToLogin();
    if (typeof setCurrentPage === 'function') return setCurrentPage('login');
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await authService.register({ userName, email, password });
      if (res?.token) {
        const me = await userService.me();
        localStorage.setItem('user', JSON.stringify(me));
        afterSuccess(me);
      } else {
        goLogin();
      }
    } catch (err) {
      const msg =
          typeof err === 'string'
              ? err
              : err?.response?.data?.message || 'Regisztráció sikertelen';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const isEmailValid = /^\S+@\S+\.\S+$/.test(email);
  const canSubmit =
      userName.trim().length >= 3 &&
      isEmailValid &&
      password.length >= 6 &&
      !loading;

  return (
      <div className="auth-page">
        <div className="auth-card">
          <h2>Regisztráció</h2>

          <form onSubmit={handleRegister}>
            <input
                type="text"
                placeholder="Felhasználónév"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
            />
            <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Jelszó (min. 6 karakter)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit" disabled={!canSubmit}>
              {loading ? 'Regisztráció…' : 'Regisztráció'}
            </button>
            {error && <p style={{ color: 'red', marginTop: 8 }}>{error}</p>}
          </form>

          <p style={{ marginTop: 12 }}>
            Van már fiókod?{' '}
            <button type="button" onClick={goLogin}>
              Bejelentkezés
            </button>
          </p>
        </div>
      </div>
  );
}
