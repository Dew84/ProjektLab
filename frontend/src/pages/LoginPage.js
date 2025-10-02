import React, { useState } from 'react';

function LoginPage({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // TODO: Itt lesz majd az API hívás
      // const result = await authService.login({ email, password });
      
      // TESZT - Sikeres login szimuláció
      console.log('Login:', { email, password, rememberMe });
      
      // Teszt user beállítása
      setUser({
        id: 1,
        name: 'Teszt Felhasználó',
        email: email,
        role: 'User'
      });
      
      alert('Sikeres bejelentkezés!');
      
    } catch (err) {
      setError('Bejelentkezés sikertelen!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '50px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Bejelentkezés</h2>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Email:</label>
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label>Jelszó:</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            {' '}Emlékezz rám
          </label>
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          style={{ padding: '10px 20px', cursor: 'pointer' }}
        >
          {loading ? 'Betöltés...' : 'Bejelentkezés'}
        </button>
      </form>
      
      <p style={{ marginTop: '20px' }}>
        <a href="/register">Még nincs fiókod? Regisztrálj!</a>
      </p>
    </div>
  );
}

export default LoginPage;