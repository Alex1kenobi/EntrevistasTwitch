


import React, { useState } from 'react';
import axios from 'axios';

const TWITCH_OAUTH_URL = 'https://id.twitch.tv/oauth2/token';

function Login() {
  const [clientID, setClientID] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(null);

  async function handleLogin(event) {
    event.preventDefault();

    try {
      const response = await axios.post(TWITCH_OAUTH_URL, {
        client_id: clientID,
        client_secret: clientSecret,
        grant_type: 'password',
        username,
        password,
      });

      setToken(response.data.access_token);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <label htmlFor="clientID">Client ID:</label>
      <input
        type="text"
        id="clientID"
        value={clientID}
        onChange={event => setClientID(event.target.value)}
      />

      <label htmlFor="clientSecret">Client Secret:</label>
      <input
        type="text"
        id="clientSecret"
        value={clientSecret}
        onChange={event => setClientSecret(event.target.value)}
      />

      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={event => setUsername(event.target.value)}
      />

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={event => setPassword(event.target.value)}
      />

      <button type="submit">Login</button>

      {token && <p>Token: {token}</p>}
    </form>
  );
}