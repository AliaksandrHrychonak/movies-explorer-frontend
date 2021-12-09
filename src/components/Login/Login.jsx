import React from 'react';
import AuthContainer from "../AuthContainer/AuthContainer";
import LoginForm from '../Forms/LoginForm';

const Login = () => {
  return (
    <AuthContainer title="Рады видеть!">
      <LoginForm />
    </AuthContainer>
  );
}

export default Login;
