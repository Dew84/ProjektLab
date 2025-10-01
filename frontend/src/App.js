import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <Navbar user={user} setUser={setUser} />
      <HomePage />
    </div>
  );
}

export default App;