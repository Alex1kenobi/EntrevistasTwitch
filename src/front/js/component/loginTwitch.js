import React, { useState } from 'react';
import axios from 'axios';

const TWITCH_CLIENT_ID = '6nqp1ziuksr6q162ce3b3f9vsnz3mo';
const TWITCH_OAUTH_URL = 'https://id.twitch.tv/oauth2/authorize';


export const LoginTwitch = () => {
  const [username, setUsername] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.get(TWITCH_OAUTH_URL, {
        params: {
          client_id: TWITCH_CLIENT_ID,
          redirect_uri: 'https://3000-alex1kenobi-twitch-vmkk13sx1fz.ws-eu78.gitpod.io/',
          response_type: 'token',
          scope: 'user:read:email',
        },
      });

      if (response.data) {
        // Redirigir al usuario a la página de autorización de Twitch
        window.location.replace(response.data);
      }
    } catch (error) {
      // Manejar el error
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Iniciar sesión con Twitch</h1>
      <input
        type="text"
        placeholder="Nombre de usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleLogin}>Iniciar sesión</button>
    </div>
  );
};



