import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
  useEffect(() => {
    console.log(import.meta.env.VITE_GOOGLE_CLIENT_ID);
  }, []);
  return <div>Login</div>;
};

export default Login;
