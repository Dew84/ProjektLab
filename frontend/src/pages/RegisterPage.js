import React, { useState } from 'react';

function RegisterPage({ setUser }) {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('A jelszavak nem egyeznek!');
      return;
    }

    setLoading(true);

    try {
      // TODO: Itt lesz majd az API hívás
      // const result = await authService.register({ userName, email, password });
      
      // TESZT - Sikeres regisztráció szimuláció
      console.log('Register:', { userName, email, password });
      
      setUser({
        id: 1,
        name: userName,
        email: email,
        role: 'User'
      });
      
      alert('Sikeres regisztráció!');
      
    } catch (err) {
      setError('Regisztráció sikertelen!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '50px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Regisztráció</h2>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Felhasználónév:</label>
          <br />
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        
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
          <label>Jelszó megerősítése:</label>
          <br />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          style={{ padding: '10px 20px', cursor: 'pointer' }}
        >
          {loading ? 'Betöltés...' : 'Regisztráció'}
        </button>
      </form>
      
      <p style={{ marginTop: '20px' }}>
        <a href="/login">Már van fiókod? Jelentkezz be!</a>
      </p>
    </div>
  );
}

export default RegisterPage;