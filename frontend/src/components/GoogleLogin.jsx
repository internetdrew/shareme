import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { client } from '../client';

const GoogleLogin = () => {
  const navigate = useNavigate();

  const handleCredentialResponse = response => {
    const userObject = jwt_decode(response.credential);
    localStorage.setItem('user', JSON.stringify(userObject));

    const { name, sub: googleId, picture: imageUrl } = userObject;

    const doc = {
      _id: googleId,
      _type: 'user',
      userName: name,
      image: imageUrl,
    };

    client.createIfNotExists(doc).then(() => {
      navigate('/', { replace: true });
    });
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
