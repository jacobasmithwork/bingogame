import React, { useState, useEffect } from 'https://esm.sh/react@18.2.0';
import { createRoot } from 'https://esm.sh/react-dom@18.2.0/client';

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function setCookie(name, value, days = 1) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; path=/; expires=${expires}`;
}

function App() {
  const [username, setUsername] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const existingUser = getCookie('username');
    if (existingUser) setLoggedInUser(existingUser);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim()) {
      setCookie('username', username.trim());
      setLoggedInUser(username.trim());
    }
  };

  const handleSpotClick = (row, col) => {
    console.log(`User ${loggedInUser} clicked spot ${row},${col}`);
    // You can emit a WebSocket event here
  };

  if (!loggedInUser) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Login to Play Bingo</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Welcome, {loggedInUser}</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 100px)',
          gridGap: '10px',
          marginTop: 20,
        }}
      >
        {Array.from({ length: 5 }, (_, row) =>
          Array.from({ length: 5 }, (_, col) => (
            <div
              key={`${row}-${col}`}
              onClick={() => handleSpotClick(row, col)}
              style={{
                width: '100px',
                height: '100px',
                border: '2px solid #555',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                userSelect: 'none',
                fontSize: '1.2em',
                background: '#f0f0f0',
              }}
            >
              {String.fromCharCode(65 + col)}{row + 1}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
