import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import Signin from './Signin';

const SignInProtectedRoute = ({ children }) => {
  const { user } = UserAuth();
  const navigate = useNavigate();

  useEffect(()=>{
    if (user) {
      navigate("/account")
    }
  })
  return children;
};

export default SignInProtectedRoute;