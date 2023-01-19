import React from 'react';
import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';

const GoogleLogin = () => {
  const [user, setUser] = useState({});

  const handleCredentialResponse = response => {
    const userObject = jwt_decode(response.credential);
    setUser(userObject);
  };

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
    });

    google.accounts.id.renderButton(document.getElementById('signInDiv'), {
      theme: 'outline',
      size: 'large',
    });

    google.accounts.id.prompt();
  }, []);

  return <div id='signInDiv'></div>;
};

export default GoogleLogin;
