import { useState } from 'react';
import authService from '../services/authService';
import userService from '../services/userService';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';

export default function LoginPage(props) {
  const { onLoginSuccess, switchToRegister, setUser, setCurrentPage } = props;
  const navigate = useNavigate();

  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  const afterSuccess = (user) => {
    if (typeof onLoginSuccess === 'function') {
      onLoginSuccess(user);
    }
    if (typeof setUser === 'function') {
      setUser(user);
    }
    navigate('/'); // <-- főoldalra dob
  };


  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await authService.login({ email, password });
      const me = await userService.me();
      localStorage.setItem('user', JSON.stringify(me));
      afterSuccess(me);
    } catch (err) {
      const msg = typeof err === 'string'
          ? err
          : err?.response?.data?.message || 'Hibás e-mail vagy jelszó.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const isEmailValid = /\S+@\S+\.\S+/.test(email);
  const canSubmit = isEmailValid && password.length > 0 && !loading;

  return (
      <div className="auth-page">
        <div className="auth-card">
          <h2>Bejelentkezés</h2>

          <form onSubmit={handleLogin}>
            <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
            />
            <input
                type="password"
                placeholder="Jelszó"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            <button type="submit" disabled={!canSubmit}>
              {loading ? 'Bejelentkezés…' : 'Bejelentkezés'}
            </button>

            {error && <p style={{ color: 'red', marginTop: 8 }}>{error}</p>}
          </form>

          <p style={{ marginTop: 12 }}>
            Nincs fiókod?{' '}
            <button
                type="button"
                onClick={() =>
                    typeof switchToRegister === 'function'
                        ? switchToRegister()
                        : typeof setCurrentPage === 'function' && setCurrentPage('register')
                }
            >
              Regisztráció
            </button>
          </p>
        </div>
      </div>
  );
}
